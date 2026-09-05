// Custom Flutter web bootstrap.
//
// Replaces the default generated bootstrap so we can:
//  1. Show real startup progress on the splash screen (web/index.html).
//  2. Hide the splash only when Flutter actually renders its first frame
//     (instead of during the blank period while the engine downloads).
//  3. Forward the app config to the engine ourselves (required when a custom
//     onEntrypointLoaded callback is used).
//
// The two template tokens below are substituted by `flutter build web`.

{{flutter_js}}
{{flutter_build_config}}

(function () {
  'use strict';

  const splash = document.getElementById('splash');
  const progressBar = document.getElementById('splash-progress-bar');
  const statusText = document.getElementById('splash-status');

  const setProgress = function (fraction, label) {
    if (progressBar) progressBar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, fraction)) + ')';
    if (statusText && label) statusText.textContent = label;
  };

  setProgress(0.1, 'Loading engine…');

  // Safety net: never leave the splash up for more than 20 seconds, even if
  // something goes wrong with the frame callback (e.g. an older engine).
  const fallbackTimer = setTimeout(hideSplash, 20000);

  let splashHidden = false;
  function hideSplash() {
    if (splashHidden) return;
    splashHidden = true;
    clearTimeout(fallbackTimer);
    setProgress(1, 'Ready!');
    if (splash) {
      splash.classList.add('splash-hidden');
      // Remove from the layout entirely once the fade-out finishes.
      setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 500);
    }
  }

  // Hide the splash on Flutter's *first rendered frame*, so there is never a
  // flash of blank canvas between splash and real UI.
  // Multithreaded SkWasm needs SharedArrayBuffer, which needs cross-origin
  // isolation (COOP/COEP headers). Browsers that ignore COEP: credentialless
  // (e.g. Firefox) never become isolated, so they get the fully-supported
  // CanvasKit renderer instead. Works for both --wasm and JS builds.
  const engineConfig = {
    renderer: window.crossOriginIsolated ? 'auto' : 'canvaskit',
  };

  _flutter.loader.load({
    config: engineConfig,
    onEntrypointLoaded: async function (engineInitializer) {
      setProgress(0.35, 'Starting engine…');
      // Config is NOT auto-forwarded when a custom onEntrypointLoaded is
      // used — pass it to the engine explicitly.
      const appRunner = await engineInitializer.initializeEngine(engineConfig);
      setProgress(0.7, 'Fetching the first cat…');
      await appRunner.runApp();
      // The app is running; the first real frame arrives within a frame or
      // two. Give it one rAF so the transition doesn't show an empty canvas.
      requestAnimationFrame(function () {
        requestAnimationFrame(hideSplash);
      });
    },
  });
})();
