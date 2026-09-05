import 'package:flutter/material.dart';
import 'dart:ui_web' as ui_web;
import 'package:web/web.dart' as web;

final Set<String> _registeredTypes = {};
final Set<String> _preloadedUrls = {};

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
/// the user swipes to it. The browser caches the response, so the `<img>`
/// element created later by [buildWebImage] reuses it.
void preloadWebImage(String url) {
  if (_preloadedUrls.contains(url)) return;
  _preloadedUrls.add(url);

  try {
    final stream = NetworkImage(url).resolve(ImageConfiguration.empty);
    late final ImageStreamListener listener;
    listener = ImageStreamListener(
      (_, _) => stream.removeListener(listener),
      onError: (_, _) => stream.removeListener(listener),
    );
    stream.addListener(listener);
  } catch (_) {
    // Preloading is best-effort; the visible card still loads normally.
  }
}
