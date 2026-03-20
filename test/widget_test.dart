import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:cat_carousel/main.dart';

void main() {
  testWidgets('Cat Carousel app loads correctly', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const CatCarouselApp());

    // Verify that the app title is displayed
    expect(find.text('🐱 Cat Carousel'), findsOneWidget);

    // Verify that the refresh button is present
    expect(find.byIcon(Icons.refresh_rounded), findsOneWidget);

    // Verify that loading indicator is shown initially
    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });
}
