class CatImage {
  final String id;
  final String url;
  final int width;
  final int height;

  CatImage({required this.id, required this.url, required this.width, required this.height});

  factory CatImage.fromJson(Map<String, dynamic> json) => CatImage(
    id: json['id'] ?? '', url: json['url'] ?? '', width: json['width'] ?? 0, height: json['height'] ?? 0,
  );
}

class FoxImage {
  final String image;
  final String link;

  FoxImage({required this.image, required this.link});

  factory FoxImage.fromJson(Map<String, dynamic> json) => FoxImage(
    image: json['image'] ?? '', link: json['link'] ?? '',
  );
}

class DisplayImage {
  final String id;
  final String url;
  final String tagPrefix;

  DisplayImage({required this.id, required this.url, required this.tagPrefix});

  factory DisplayImage.fromCat(CatImage cat) => DisplayImage(
    id: cat.id.length > 8 ? cat.id.substring(0, 8) : cat.id, url: cat.url, tagPrefix: 'Cat',
  );

  factory DisplayImage.fromFox(FoxImage fox) => DisplayImage(
    id: fox.link.hashCode.abs().toString().substring(0, 8), url: fox.image, tagPrefix: 'Fox',
  );
}