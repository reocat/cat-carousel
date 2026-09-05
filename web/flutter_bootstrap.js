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

  // Defensive: unregister any stale service workers left over from previous
  // deployments. An old service worker serving a cached mix of old/new files
  // is a classic cause of a wedged loading screen, and this site currently
  // has no service-worker-based features to lose.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
    }).catch(function () {});
  }

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
  //
  // IMPORTANT: never pass 'auto' here. The loader build-selection compares
  // the requested renderer string against each build's renderer, so 'auto'
  // matches nothing and startup dies with "no compatible build found".
  // Omitting the renderer entirely lets the loader pick on its own.
  const engineConfig = {};
  if (!window.crossOriginIsolated) {
    engineConfig.renderer = 'canvaskit';
  }

  // Defensive: drop degenerate build entries (e.g. a bare `{}` stub that some
  // build pipelines emit when the wasm compile step fails) so the loader
  // always has a valid build to select.
  if (window._flutter && _flutter.buildConfig && Array.isArray(_flutter.buildConfig.builds)) {
    const validBuilds = _flutter.buildConfig.builds.filter(function (b) {
      return b && typeof b.compileTarget === 'string' &&
        (typeof b.mainJsPath === 'string' || typeof b.mainWasmPath === 'string');
    });
    if (validBuilds.length > 0) _flutter.buildConfig.builds = validBuilds;
  }

  const loadPromise = _flutter.loader.load({
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

  // If startup fails, say so on the splash instead of spinning forever.
  if (loadPromise && typeof loadPromise.catch === 'function') {
    loadPromise.catch(function (err) {
      console.error('Flutter startup failed:', err);
      if (statusText) statusText.textContent = 'Failed to start — please reload';
    });
  }
})();
