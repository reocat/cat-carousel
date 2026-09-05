import 'package:flutter/material.dart';

// Phones will read this file instead, which just returns an empty box!
Widget buildWebImage(String url) => const SizedBox();

// No-op on non-web platforms: Image.network already shows a loading spinner.
void preloadWebImage(String url) {}
