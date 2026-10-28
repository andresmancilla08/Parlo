package co.parlo.app;

import android.graphics.Color;
import android.view.Window;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Marco de la app: la web avisa de su tema (claro/oscuro, que puede no ser el
 * del sistema) y aquí se pintan del mismo color las franjas de la barra de
 * estado y de navegación, con iconos legibles. Ver MainActivity (insets).
 */
@CapacitorPlugin(name = "ParloShell")
public class ParloShellPlugin extends Plugin {

    static final int LIGHT_BG = Color.parseColor("#FFF9F5");
    static final int DARK_BG = Color.parseColor("#140E24");

    @PluginMethod
    public void setTheme(PluginCall call) {
        final boolean dark = Boolean.TRUE.equals(call.getBoolean("dark", false));
        getActivity()
            .runOnUiThread(() -> {
                apply(getActivity().getWindow(), dark);
                call.resolve();
            });
    }

    static void apply(Window window, boolean dark) {
        window.getDecorView().setBackgroundColor(dark ? DARK_BG : LIGHT_BG);
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(window, window.getDecorView());
        c.setAppearanceLightStatusBars(!dark);
        c.setAppearanceLightNavigationBars(!dark);
    }
}
