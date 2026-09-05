import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/models.dart';

class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final dynamic originalError;

  ApiException({required this.message, this.statusCode, this.originalError});

  @override
  String toString() => statusCode != null ? 'ApiException($statusCode): $message' : 'ApiException: $message';
}

abstract class ApiClientBase {
  String get baseUrl;
  Map<String, String>? get defaultHeaders => null;

  /// Kept tight so a hung request can't stall the UI for half a minute.
  Duration get timeout => const Duration(seconds: 12);

  Future<dynamic> get(String path, {Map<String, dynamic>? queryParameters}) async {
    var uri = Uri.parse('$baseUrl$path');
    if (queryParameters != null && queryParameters.isNotEmpty) {
      final stringParams = queryParameters.map((key, value) => MapEntry(key, value?.toString() ?? ''));
      uri = uri.replace(queryParameters: stringParams);
    }
    
    final response = await http.get(uri, headers: defaultHeaders).timeout(timeout);
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) return null;
      return json.decode(response.body);
    }
    throw ApiException(message: 'Request failed', statusCode: response.statusCode, originalError: response.body);
  }
}

class CatApi extends ApiClientBase {
  @override
  String get baseUrl => 'https://api.thecatapi.com/v1';

  Future<List<CatImage>> searchImages({int limit = 10, int? page}) async {
    final response = await get('/images/search', queryParameters: {'limit': limit, 'page': ?page});
    if (response is List) return response.cast<Map<String, dynamic>>().map((json) => CatImage.fromJson(json)).toList();
    throw ApiException(message: 'Unexpected format', originalError: response);
  }
}

class FoxApi extends ApiClientBase {
  @override
  String get baseUrl => 'https://randomfox.ca';

  Future<FoxImage> getRandomFox() async {
    final response = await get('/floof/');
    if (response is Map<String, dynamic>) return FoxImage.fromJson(response);
    throw ApiException(message: 'Unexpected format', originalError: response);
  }

  /// Fetches all foxes in parallel instead of one-by-one: 10 round-trips
  /// overlap instead of stacking up, cutting load time several-fold.
  Future<List<FoxImage>> getRandomFoxes({int count = 5}) async {
    final results = await Future.wait(
      List.generate(count, (_) async {
        try {
          return await getRandomFox();
        } catch (_) {
          return null; // Skip failed requests, same as before.
        }
      }),
    );
    return results.whereType<FoxImage>().toList();
  }
}