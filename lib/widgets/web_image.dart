// Note: `dart.library.js_interop` (not `dart.library.html`) is the web check
// that works for BOTH dart2js and dart2wasm builds.
export 'web_image_stub.dart' if (dart.library.js_interop) 'web_image_web.dart';