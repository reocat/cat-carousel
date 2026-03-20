import 'package:flutter/material.dart';
import 'dart:ui_web' as ui_web;
import 'package:web/web.dart' as web;

final Set<String> _registeredTypes = {};

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