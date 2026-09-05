import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../api/api.dart';
import '../models/models.dart';
import '../config/config.dart';
import '../widgets/image_card.dart';
import '../widgets/web_image.dart';

class CatCarouselPage extends StatefulWidget {
  final AppConfig config;
  const CatCarouselPage({super.key, required this.config});

  @override
  State<CatCarouselPage> createState() => _CatCarouselPageState();
}

class _CatCarouselPageState extends State<CatCarouselPage> {
  List<DisplayImage> _images =[];
  bool _isLoading = true;
  String? _error;
  int _currentIndex = 0;
  bool _isFetchingMore = false;
  late ApiOption _currentApi;
  
  final CarouselSliderController _carouselController = CarouselSliderController();
  final CatApi _catApi = CatApi();
  final FoxApi _foxApi = FoxApi();

  @override
  void initState() {
    super.initState();
    _currentApi = widget.config.selectedApi;
    widget.config.addListener(_onConfigChanged);
    HardwareKeyboard.instance.addHandler(_handleKeyEvent);
    _fetchImages();
  }

  @override
  void dispose() {
    widget.config.removeListener(_onConfigChanged);
    HardwareKeyboard.instance.removeHandler(_handleKeyEvent);
    super.dispose();
  }

  void _onConfigChanged() {
    if (_currentApi != widget.config.selectedApi) {
      setState(() { _currentApi = widget.config.selectedApi; _currentIndex = 0; });
      _fetchImages(append: false);
    }
  }

  /// Warm the cache for images around the current slide so swiping never
  /// waits on a fresh download.
  void _preloadNeighbors() {
    for (final i in [_currentIndex + 1, _currentIndex + 2, _currentIndex - 1]) {
      if (i >= 0 && i < _images.length) preloadWebImage(_images[i].url);
    }
  }

  bool _handleKeyEvent(KeyEvent event) {
    if (event is KeyDownEvent) {
      if (event.logicalKey == LogicalKeyboardKey.arrowLeft) {
        _carouselController.previousPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
        return true;
      } else if (event.logicalKey == LogicalKeyboardKey.arrowRight) {
        _carouselController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
        return true;
      }
    }
    return false;
  }

  Future<void> _fetchImages({bool append = false}) async {
    if (_isFetchingMore) return;
    if (!append) {
      setState(() { _isLoading = true; _error = null; });
    } else {
      setState(() => _isFetchingMore = true);
    }

    try {
      List<DisplayImage> newImages =[];
      if (_currentApi == ApiOption.cat) {
        final cats = await _catApi.searchImages(limit: widget.config.initialLimit);
        newImages = cats.map((c) => DisplayImage.fromCat(c)).toList();
      } else {
        final foxes = await _foxApi.getRandomFoxes(count: widget.config.initialLimit);
        newImages = foxes.map((f) => DisplayImage.fromFox(f)).toList();
      }

      setState(() {
        if (append) {
          _images.addAll(newImages);
        } else {
          _images = newImages;
        }
        _isLoading = false; _isFetchingMore = false;
      });
      _preloadNeighbors();
    } catch (e) {
      setState(() { _error = 'Error: $e'; _isLoading = false; _isFetchingMore = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: Column(
          children:[
            _buildCompactTopBar(),
            Expanded(
              child: _buildBody(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCompactTopBar() {
    return Container(
      margin: const EdgeInsets.only(top: 16, bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(30),
        boxShadow:[
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children:[
          const SizedBox(width: 8),
          Text(
            '${_currentApi == ApiOption.cat ? '🐱 Cat' : '🦊 Fox'} Carousel',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 15,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ),
          const SizedBox(width: 12),
          Container(
            width: 1.5,
            height: 16,
            color: Theme.of(context).colorScheme.outlineVariant,
          ),
          const SizedBox(width: 4),
          IconButton(
            icon: const Icon(Icons.refresh_rounded, size: 20),
            onPressed: _isLoading ? null : _fetchImages,
            visualDensity: VisualDensity.compact,
            tooltip: 'Load new animals',
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_isLoading) return const Center(child: CircularProgressIndicator());
    if (_error != null) return Center(child: FilledButton.icon(onPressed: _fetchImages, icon: const Icon(Icons.refresh), label: const Text('Try Again')));
    if (_images.isEmpty) return const Center(child: Text('No animals found! 😿'));

    return LayoutBuilder(
      builder: (context, constraints) {
        double safeWidth = constraints.maxWidth - 16; 
        double safeHeight = constraints.maxHeight - 110;
        
        if (safeWidth < 0) safeWidth = 0;
        if (safeHeight < 0) safeHeight = 0;

        double targetAspectRatio = 1.5; 
        double w = safeWidth;
        double h = w / targetAspectRatio;

        if (h > safeHeight) {
          h = safeHeight;
          w = h * targetAspectRatio;
        }

        if (w > 800) {
          w = 800;
          h = w / targetAspectRatio;
        }

        return Container(
          width: constraints.maxWidth,
          alignment: Alignment.center,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children:[
              SizedBox(
                width: w,
                height: h,
                child: Stack(
                  alignment: Alignment.center,
                  children:[
                    CarouselSlider.builder(
                      carouselController: _carouselController,
                      itemCount: _images.length,
                      options: CarouselOptions(
                        height: h,
                        viewportFraction: 1.0,
                        enlargeCenterPage: false,
                        enableInfiniteScroll: true,
                        autoPlay: widget.config.autoPlay,
                        autoPlayInterval: const Duration(seconds: 3),
                        onPageChanged: (index, reason) {
                          setState(() => _currentIndex = index);
                          _preloadNeighbors();
                          if (index >= _images.length - 3 && !_isFetchingMore) _fetchImages(append: true);
                        },
                      ),
                      itemBuilder: (context, index, realIndex) => ImageCard(
                        image: _images[index], 
                        showId: widget.config.showImageIds
                      ),
                    ),
                    
                    _buildNavButton(left: 12, icon: Icons.arrow_back_ios_new_rounded, action: _carouselController.previousPage),
                    _buildNavButton(right: 12, icon: Icons.arrow_forward_ios_rounded, action: _carouselController.nextPage),
                  ],
                ),
              ),
              
              const SizedBox(height: 24),
              _buildIndicator(),
              const SizedBox(height: 24),
            ],
          ),
        );
      },
    );
  }

  Widget _buildNavButton({double? left, double? right, required IconData icon, required void Function() action}) {
    return Positioned(
      left: left, right: right,
      child: FilledButton.tonal(
        onPressed: action,
        style: FilledButton.styleFrom(
          padding: const EdgeInsets.all(12),
          minimumSize: const Size(44, 44), 
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        ),
        child: Icon(icon, size: 20),
      ),
    );
  }

  Widget _buildIndicator() => Text(
    '${_currentIndex + 1} / ${_images.length}', 
    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)
  );
}