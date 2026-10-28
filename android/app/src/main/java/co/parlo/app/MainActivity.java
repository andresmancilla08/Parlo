package co.parlo.app;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Los plugins propios se registran ANTES de crear el puente.
        registerPlugin(ParloSpeechPlugin.class);
        super.onCreate(savedInstanceState);

        // Atrás: navega hacia atrás en la web; en la primera pantalla minimiza
        // la app (como cualquier app de Android) en vez de cerrarla.
        getOnBackPressedDispatcher()
            .addCallback(
                this,
                new OnBackPressedCallback(true) {
                    @Override
                    public void handleOnBackPressed() {
                        WebView web = getBridge() != null ? getBridge().getWebView() : null;
                        if (web != null && web.canGoBack()) {
                            web.goBack();
                        } else {
                            moveTaskToBack(true);
                        }
                    }
                }
            );
    }
}
