import 'package:flutter/material.dart';
import 'config/config.dart';
import 'pages/carousel_page.dart';
import 'pages/settings_page.dart';

void main() => runApp(const CatCarouselApp());

class CatCarouselApp extends StatelessWidget {
  const CatCarouselApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Animal Carousel',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.orange),
        useMaterial3: true,
        fontFamily: '04b03',
      ),
      home: const MainNavigationPage(),
    );
  }
}

class MainNavigationPage extends StatefulWidget {
  const MainNavigationPage({super.key});

  @override
  State<MainNavigationPage> createState() => _MainNavigationPageState();
}

class _MainNavigationPageState extends State<MainNavigationPage> {
  int _currentIndex = 0;
  late final AppConfig _config;
  final ConfigStorage _storage = ConfigStorage();
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _config = AppConfig();
    _config.addListener(() => _storage.saveConfig(_config));
    _loadConfig();
  }

  Future<void> _loadConfig() async {
    final savedConfig = await _storage.loadConfig();
    if (savedConfig != null) _config.copyFrom(savedConfig);
    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) return const Scaffold(body: Center(child: CircularProgressIndicator()));

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children:[
          CatCarouselPage(config: _config),
          SettingsPage(config: _config),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (i) => setState(() => _currentIndex = i),
        destinations: const[
          NavigationDestination(icon: Icon(Icons.pets), label: 'Animals'),
          NavigationDestination(icon: Icon(Icons.settings), label: 'Settings'),
        ],
      ),
    );
  }
}