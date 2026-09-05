// The system-accent helper is only meaningful on the web (native platforms are
// covered by the dynamic_color plugin). Same conditional-import pattern as
// web_image.dart: `dart.library.js_interop` works for both dart2js and
// dart2wasm builds.
export 'system_accent_stub.dart' if (dart.library.js_interop) 'system_accent_web.dart';
