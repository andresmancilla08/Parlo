package co.parlo.app;

import android.Manifest;
import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.util.ArrayList;

/**
 * Reconocimiento de voz nativo (android.speech.SpeechRecognizer) para la web
 * cargada en el WebView, que no tiene SpeechRecognition.
 *
 * Imita los eventos de la Web Speech API para que `lib/native-speech.ts` los
 * convierta en un objeto `Recognition` y el dictado, la práctica, manos libres
 * y «Dilo tú» funcionen sin cambios. Todo llega por UN evento, «speech», con
 * el id de la sesión: un reconocedor viejo nunca pisa a uno nuevo.
 *
 * Tipos: start · speechstart · result (text, final) · error (código de Web
 * Speech: no-speech, network, audio-capture, not-allowed, aborted…) · end.
 *
 * Se escribió aquí en vez de usar @capacitor-community/speech-recognition
 * porque, con resultados parciales, ese plugin pierde los errores (resuelve
 * `start` al instante y luego rechaza una llamada ya resuelta) y no distingue
 * el resultado final de los provisionales.
 */
@CapacitorPlugin(
    name = "ParloSpeech",
    permissions = { @Permission(strings = { Manifest.permission.RECORD_AUDIO }, alias = ParloSpeechPlugin.MIC) }
)
public class ParloSpeechPlugin extends Plugin {

    static final String MIC = "microphone";
    private static final String EVENT = "speech";

    private SpeechRecognizer recognizer;
    private String session;

    @PluginMethod
    public void available(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("available", SpeechRecognizer.isRecognitionAvailable(getContext()));
        call.resolve(ret);
    }

    @PluginMethod
    public void start(PluginCall call) {
        if (getPermissionState(MIC) != PermissionState.GRANTED) {
            requestPermissionForAlias(MIC, call, "micPermission");
            return;
        }
        begin(call);
    }

    @PermissionCallback
    private void micPermission(PluginCall call) {
        if (getPermissionState(MIC) == PermissionState.GRANTED) {
            begin(call);
            return;
        }
        String id = call.getString("session", "");
        emit(id, "error", "not-allowed", null, false);
        emit(id, "end", null, null, false);
        call.resolve();
    }

    private void begin(PluginCall call) {
        final String id = call.getString("session", "");
        final String lang = call.getString("lang", "en-US");
        final boolean interim = Boolean.TRUE.equals(call.getBoolean("interimResults", true));
        getActivity()
            .runOnUiThread(() -> {
                // Sólo hay un reconocedor: el anterior se cierra avisando a su dueño.
                if (session != null) {
                    String old = session;
                    destroy();
                    emit(old, "error", "aborted", null, false);
                    emit(old, "end", null, null, false);
                }
                if (!SpeechRecognizer.isRecognitionAvailable(getContext())) {
                    emit(id, "error", "service-not-allowed", null, false);
                    emit(id, "end", null, null, false);
                    call.resolve();
                    return;
                }
                session = id;
                Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
                intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, lang);
                intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, interim);
                intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
                intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, getContext().getPackageName());
                if (listen(id, intent, false)) emit(id, "start", null, null, false);
                call.resolve();
            });
    }

    /** Crea el reconocedor de la sesión y empieza a escuchar. `false` si no pudo. */
    private boolean listen(String id, Intent intent, boolean retried) {
        SpeechRecognizer r = SpeechRecognizer.createSpeechRecognizer(getContext());
        recognizer = r;
        session = id;
        r.setRecognitionListener(new Listener(r, id, intent, retried));
        try {
            r.startListening(intent);
            return true;
        } catch (Exception ex) {
            emit(id, "error", "audio-capture", null, false);
            finish(r, id);
            return false;
        }
    }

    /** Termina de escuchar y entrega lo oído (como `recognition.stop()`). */
    @PluginMethod
    public void stop(PluginCall call) {
        final String id = call.getString("session", "");
        getActivity()
            .runOnUiThread(() -> {
                if (!id.equals(session)) {
                    // Nada.
                } else if (recognizer != null) {
                    recognizer.stopListening();
                } else {
                    // Parado durante un reintento: se cierra sin resultado.
                    session = null;
                    emit(id, "end", null, null, false);
                }
                call.resolve();
            });
    }

    /** Corta y descarta (como `recognition.abort()`): llega `error: aborted` y `end`.
     * Sólo actúa sobre la sesión pedida: nunca corta la de otro. */
    @PluginMethod
    public void abort(PluginCall call) {
        final String id = call.getString("session", "");
        getActivity()
            .runOnUiThread(() -> {
                if (id.equals(session)) {
                    destroy();
                    emit(id, "error", "aborted", null, false);
                    emit(id, "end", null, null, false);
                }
                call.resolve();
            });
    }

    @Override
    protected void handleOnDestroy() {
        destroy();
    }

    private void destroy() {
        if (recognizer != null) {
            try {
                recognizer.cancel();
                recognizer.destroy();
            } catch (Exception ignored) {}
        }
        recognizer = null;
        session = null;
    }

    /** Cierra la sesión `id` si sigue siendo la actual y avisa `end` una sola vez. */
    private void finish(SpeechRecognizer r, String id) {
        if (recognizer != r) return;
        destroy();
        emit(id, "end", null, null, false);
    }

    private void emit(String id, String type, String error, String text, boolean isFinal) {
        JSObject ret = new JSObject();
        ret.put("session", id);
        ret.put("type", type);
        if (error != null) ret.put("error", error);
        if (text != null) {
            ret.put("text", text);
            ret.put("final", isFinal);
        }
        notifyListeners(EVENT, ret);
    }

    /** Códigos de Android → los de la Web Speech API (`mapRecognitionError`). */
    static String webError(int code) {
        switch (code) {
            case SpeechRecognizer.ERROR_NO_MATCH:
            case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
                return "no-speech";
            case SpeechRecognizer.ERROR_NETWORK:
            case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
            case SpeechRecognizer.ERROR_SERVER:
            case 11: // ERROR_SERVER_DISCONNECTED (API 31)
                return "network";
            case SpeechRecognizer.ERROR_AUDIO:
                return "audio-capture";
            case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS:
                return "not-allowed";
            case SpeechRecognizer.ERROR_CLIENT:
                return "aborted";
            case 12: // ERROR_LANGUAGE_NOT_SUPPORTED (API 31)
            case 13: // ERROR_LANGUAGE_UNAVAILABLE (API 31)
                return "language-not-supported";
            default:
                return "failed";
        }
    }

    /** Fallos del servicio que suelen arreglarse reintentando al momento. */
    private static boolean transient_(int code) {
        return (
            code == SpeechRecognizer.ERROR_RECOGNIZER_BUSY ||
            code == SpeechRecognizer.ERROR_CLIENT ||
            code == SpeechRecognizer.ERROR_SERVER ||
            code == 11 // ERROR_SERVER_DISCONNECTED (API 31)
        );
    }

    private static String first(Bundle bundle) {
        if (bundle == null) return null;
        ArrayList<String> list = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (list == null || list.isEmpty()) return null;
        return list.get(0);
    }

    private class Listener implements RecognitionListener {

        private final SpeechRecognizer owner;
        private final String id;
        private final Intent intent;
        private final boolean retried;
        private final long startedAt = SystemClock.elapsedRealtime();
        private boolean heard = false;

        Listener(SpeechRecognizer owner, String id, Intent intent, boolean retried) {
            this.owner = owner;
            this.id = id;
            this.intent = intent;
            this.retried = retried;
        }

        private boolean stale() {
            return recognizer != owner;
        }

        @Override
        public void onReadyForSpeech(Bundle params) {}

        @Override
        public void onBeginningOfSpeech() {
            heard = true;
            if (!stale()) emit(id, "speechstart", null, null, false);
        }

        @Override
        public void onRmsChanged(float rmsdB) {}

        @Override
        public void onBufferReceived(byte[] buffer) {}

        @Override
        public void onEndOfSpeech() {}

        @Override
        public void onError(int error) {
            if (stale()) return;
            // Al reabrir el micro justo después de cerrar otro (manos libres), el
            // servicio de Google a veces aún se está apagando y la sesión nueva
            // falla al instante (desconectado/ocupado). Se reintenta UNA vez, sin
            // avisar a la web: si no, manos libres lo tomaría por «sin red».
            boolean early = !heard && SystemClock.elapsedRealtime() - startedAt < 1500;
            if (!retried && early && transient_(error)) {
                Logger.debug("ParloSpeech", "reintento tras error " + error);
                try {
                    owner.destroy();
                } catch (Exception ignored) {}
                recognizer = null;
                getBridge().getWebView().postDelayed(() -> {
                    if (recognizer == null && id.equals(session)) listen(id, intent, true);
                }, 300);
                return;
            }
            Logger.debug("ParloSpeech", "error " + error);
            emit(id, "error", webError(error), null, false);
            finish(owner, id);
        }

        @Override
        public void onResults(Bundle results) {
            if (stale()) return;
            String text = first(results);
            if (text != null && !text.trim().isEmpty()) {
                emit(id, "result", null, text, true);
            } else {
                emit(id, "error", "no-speech", null, false);
            }
            finish(owner, id);
        }

        @Override
        public void onPartialResults(Bundle partial) {
            if (stale()) return;
            String text = first(partial);
            if (text != null && !text.trim().isEmpty()) emit(id, "result", null, text, false);
        }

        @Override
        public void onEvent(int eventType, Bundle params) {}
    }
}
