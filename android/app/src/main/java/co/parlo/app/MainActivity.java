package co.parlo.app;

import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Los plugins propios se registran ANTES de crear el puente.
        registerPlugin(ParloSpeechPlugin.class);
        registerPlugin(ParloShellPlugin.class);
        super.onCreate(savedInstanceState);

        fitWebViewInsideSystemBars();

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

    /**
     * Android 15+ dibuja de borde a borde. La web está pensada como la PWA de
     * iOS (barra de estado «default»: el contenido empieza DEBAJO), y varias
     * pantallas no reservan `env(safe-area-inset-top)`. Así que el WebView se
     * encoge para no meterse bajo las barras ni bajo el teclado, y las franjas
     * de las barras muestran el fondo de la ventana (color de la app, ver
     * ParloShellPlugin). Con esto `env(safe-area-inset-*)` vale 0 en la web y
     * no hay doble margen. (SystemBars de Capacitor va con insetsHandling
     * «disable» en capacitor.config.ts para no pelear con esto.)
     */
    private void fitWebViewInsideSystemBars() {
        boolean night =
            (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES;
        ParloShellPlugin.apply(getWindow(), night);

        View web = getBridge().getWebView();
        View container = (View) web.getParent();
        ViewCompat.setOnApplyWindowInsetsListener(container, (v, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets ime = insets.getInsets(WindowInsetsCompat.Type.ime());
            v.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, ime.bottom));
            return WindowInsetsCompat.CONSUMED;
        });
        ViewCompat.requestApplyInsets(container);
    }
}
