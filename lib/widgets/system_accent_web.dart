import 'dart:ui' as ui;
import 'dart:ui' show Color;
import 'package:web/web.dart' as web;

/// Best-effort accent color the browser/OS exposes on the web, or null when
/// the browser doesn't report one.
///
/// Two sources, in order:
///  1. Flutter's built-in `SystemColor` (dart:ui), which exposes CSS Color 4
///     system colors to the engine when the renderer provides them.
///  2. Manual resolution of the CSS `AccentColor` keyword by reading it back
///     through `getComputedStyle` (must be read while the element is attached).
///
/// Either way the browser falls back to its own default accent (e.g. Chrome's
/// blue) when the OS doesn't expose a custom accent, so callers should keep a
/// fallback color ready — the caller does.
Future<Color?> getSystemAccentColor() async {
  // Engine-provided system colors. Accessing the palettes throws
  // UnsupportedError on platforms that don't provide them, so guard it.
  try {
    if (ui.SystemColor.platformProvidesSystemColors) {
      final Color? accent = ui.SystemColor.light.accentColor.value;
      if (accent != null) return accent;
    }
  } catch (_) {}

  // Manual CSS `AccentColor` resolution.
  try {
    final web.HTMLElement el =
        web.document.createElement('div') as web.HTMLElement;
    el.style.color = 'AccentColor';
    web.document.documentElement?.append(el);
    final String resolved = web.window.getComputedStyle(el).color;
    el.remove();

    final Match? match =
        RegExp(r'rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)').firstMatch(resolved);
    if (match != null) {
      return Color.fromARGB(
        255,
        int.parse(match.group(1)!),
        int.parse(match.group(2)!),
        int.parse(match.group(3)!),
      );
    }
  } catch (_) {}

  return null;
}
