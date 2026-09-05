import 'package:flutter/material.dart';
import 'package:dynamic_color/dynamic_color.dart';
import 'config/config.dart';
import 'pages/carousel_page.dart';
import 'pages/settings_page.dart';

void main() => runApp(const CatCarouselApp());

class CatCarouselApp extends StatefulWidget {
  const CatCarouselApp({super.key});

  @override
  State<CatCarouselApp> createState() => _CatCarouselAppState();
}

class _CatCarouselAppState extends State<CatCarouselApp> {
  late final AppConfig _config;
  final ConfigStorage _storage = ConfigStorage();
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _config = AppConfig();
    _config.addListener(_saveConfig);
    _loadConfig();
  }

  @override
  void dispose() {
    _config.removeListener(_saveConfig);
    super.dispose();
  }

  void _saveConfig() => _storage.saveConfig(_config);

  Future<void> _loadConfig() async {
    final savedConfig = await _storage.loadConfig();
    if (savedConfig != null) _config.copyFrom(savedConfig);
    if (mounted) setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const MaterialApp(
        home: Scaffold(body: Center(child: CircularProgressIndicator())),
      );
    }

    // Pull the device's own accent colors (wallpaper on Android 12+,
    // accent color on Windows/macOS/Linux) via DynamicColorBuilder. On
    // platforms without dynamic color (including web) the schemes are null,
    // so we fall back to the accent color picked in Settings.
    return DynamicColorBuilder(
      builder: (ColorScheme? lightDynamic, ColorScheme? darkDynamic) {
        return ListenableBuilder(
          listenable: _config,
          builder: (context, _) {
            final ColorScheme lightScheme = lightDynamic ??
                ColorScheme.fromSeed(seedColor: _config.accentColor);
            final ColorScheme darkScheme = darkDynamic ??
                ColorScheme.fromSeed(
                  seedColor: _config.accentColor,
                  brightness: Brightness.dark,
                );

            return MaterialApp(
              title: 'Animal Carousel',
              theme: ThemeData(
                colorScheme: lightScheme,
                useMaterial3: true,
                fontFamily: '04b03',
              ),
              darkTheme: ThemeData(
                colorScheme: darkScheme,
                useMaterial3: true,
                fontFamily: '04b03',
              ),
              home: MainNavigationPage(config: _config),
            );
          },
        );
      },
    );
  }
}

class MainNavigationPage extends StatefulWidget {
  final AppConfig config;
  const MainNavigationPage({super.key, required this.config});

  @override
  State<MainNavigationPage> createState() => _MainNavigationPageState();
}

class _MainNavigationPageState extends State<MainNavigationPage> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: [
          CatCarouselPage(config: widget.config),
          SettingsPage(config: widget.config),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (i) => setState(() => _currentIndex = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.pets), label: 'Animals'),
          NavigationDestination(icon: Icon(Icons.settings), label: 'Settings'),
        ],
      ),
    );
  }
}
