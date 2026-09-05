import 'dart:js_interop' as js;
import 'package:flutter/material.dart';
import 'dart:ui_web' as ui_web;
import 'package:web/web.dart' as web;

final Set<String> _registeredTypes = {};

/// URLs we've already asked the browser to download, so each image is only
/// ever preloaded once (the carousel revisits the same URLs with infinite
/// scrolling and on every page change).
final Set<String> _preloadedUrls = {};

/// Hidden `<img>` preloaders currently in flight, keyed by URL. Keeping the
/// reference alive prevents the browser from garbage-collecting an image
/// mid-download.
final Map<String, web.HTMLImageElement> _activePreloaders = {};

Widget buildWebImage(String url) {
  final viewType = 'web-image-${url.hashCode}';

  if (!_registeredTypes.contains(viewType)) {
    ui_web.platformViewRegistry.registerViewFactory(
      viewType,
      (int viewId) {
        final img = web.HTMLImageElement()
          ..src = url
          ..style.width = '100%'
          ..style.height = '100%'
          ..style.objectFit = 'cover'
          ..style.border = 'none';

        return img;
      },
    );
    _registeredTypes.add(viewType);
  }

  return HtmlElementView(viewType: viewType);
}

/// Starts downloading [url] ahead of time so the carousel doesn't stall when
/// the user swipes to it.
///
/// We use a hidden off-DOM `<img>` element rather than Flutter's
/// [NetworkImage]: images load into an `<img>` without CORS (unlike a fetch),
/// and the response lands straight in the browser HTTP cache, which is exactly
/// what the `<img>` created later by [buildWebImage] reuses — so the visible
/// card paints instantly from cache. Best-effort: any failure here is ignored
/// and the visible card still loads normally.
void preloadWebImage(String url) {
  if (_preloadedUrls.contains(url)) return;
  _preloadedUrls.add(url);

  try {
    final img = web.HTMLImageElement()
      ..src = url
      ..style.display = 'none';
    img.onload = ((web.Event _) => _finishPreload(url)).toJS;
    img.onerror = ((web.Event _) => _finishPreload(url)).toJS;
    _activePreloaders[url] = img;
    web.document.body?.append(img);
  } catch (_) {
    // Preloading is best-effort; the visible card still loads normally.
  }
}

void _finishPreload(String url) {
  final img = _activePreloaders.remove(url);
  if (img == null) return;
  try {
    img.remove();
  } catch (_) {}
}
