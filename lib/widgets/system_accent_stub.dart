import 'dart:ui' show Color;

/// No system accent here — the dynamic_color plugin already covers
/// Android/Windows/macOS/Linux, and platforms without dynamic color (like
/// iOS) simply fall back to the picked seed color.
Future<Color?> getSystemAccentColor() async => null;
