import 'dart:convert';
import 'dart:ui' show Color;

import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum ApiOption {
  cat('Cat API', 'Cute cats'),
  fox('Fox API', 'Adorable foxes');

  final String label;
  final String description;
  const ApiOption(this.label, this.description);
}

/// Brand-orange seed used until the user picks another accent.
const Color kDefaultAccentColor = Color(0xFFFF9800);

class AppConfig extends ChangeNotifier {
  bool _autoPlay;
  int _initialLimit;
  bool _showImageIds;
  ApiOption _selectedApi;
  Color _accentColor;
  bool _useSystemAccent;

  AppConfig({
    bool autoPlay = false,
    int initialLimit = 10,
    bool showImageIds = true,
    ApiOption selectedApi = ApiOption.cat,
    Color accentColor = kDefaultAccentColor,
    bool useSystemAccent = true,
  })  : _autoPlay = autoPlay, _initialLimit = initialLimit,
        _showImageIds = showImageIds, _selectedApi = selectedApi,
        _accentColor = accentColor, _useSystemAccent = useSystemAccent;

  bool get autoPlay => _autoPlay;
  int get initialLimit => _initialLimit;
  bool get showImageIds => _showImageIds;
  ApiOption get selectedApi => _selectedApi;
  Color get accentColor => _accentColor;
  bool get useSystemAccent => _useSystemAccent;

  set autoPlay(bool value) { if (_autoPlay != value) { _autoPlay = value; notifyListeners(); } }
  set initialLimit(int value) { if (_initialLimit != value) { _initialLimit = value; notifyListeners(); } }
  set showImageIds(bool value) { if (_showImageIds != value) { _showImageIds = value; notifyListeners(); } }
  set selectedApi(ApiOption value) { if (_selectedApi != value) { _selectedApi = value; notifyListeners(); } }
  set accentColor(Color value) { if (_accentColor != value) { _accentColor = value; notifyListeners(); } }
  set useSystemAccent(bool value) { if (_useSystemAccent != value) { _useSystemAccent = value; notifyListeners(); } }

  Map<String, dynamic> toJson() => {
    'autoPlay': _autoPlay, 'initialLimit': _initialLimit,
    'showImageIds': _showImageIds, 'selectedApi': _selectedApi.name,
    'accentColor': _accentColor.toARGB32(),
    'useSystemAccent': _useSystemAccent,
  };

  factory AppConfig.fromJson(Map<String, dynamic> json) {
    return AppConfig(
      autoPlay: json['autoPlay'] ?? false,
      initialLimit: json['initialLimit'] ?? 10,
      showImageIds: json['showImageIds'] ?? true,
      selectedApi: ApiOption.values.firstWhere(
        (e) => e.name == (json['selectedApi'] as String?),
        orElse: () => ApiOption.cat,
      ),
      accentColor: Color(json['accentColor'] as int? ?? kDefaultAccentColor.toARGB32()),
      useSystemAccent: json['useSystemAccent'] ?? true,
    );
  }

  void copyFrom(AppConfig other) {
    _autoPlay = other._autoPlay; _initialLimit = other._initialLimit;
    _showImageIds = other._showImageIds; _selectedApi = other._selectedApi;
    _accentColor = other._accentColor; _useSystemAccent = other._useSystemAccent;
    notifyListeners();
  }
}

class ConfigStorage {
  static const String _configKey = 'app_config';

  Future<void> saveConfig(AppConfig config) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_configKey, jsonEncode(config.toJson()));
  }

  Future<AppConfig?> loadConfig() async {
    final prefs = await SharedPreferences.getInstance();
    final configJson = prefs.getString(_configKey);
    if (configJson == null) return null;
    try {
      return AppConfig.fromJson(jsonDecode(configJson));
    } catch (_) {
      return null;
    }
  }
}