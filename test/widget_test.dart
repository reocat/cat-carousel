import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:cat_carousel/main.dart';

void main() {
  testWidgets('App shell renders and the settings tab works', (WidgetTester tester) async {
    // Without mocked values the plugin call throws in tests and the app
    // stays stuck on its loading spinner.
    SharedPreferences.setMockInitialValues({});

    await tester.pumpWidget(const CatCarouselApp());
    // Let the config load complete and the shell appear. (The carousel's
    // network fetch intentionally never completes inside the test zone, so
    // nothing beyond the shell needs mocking.)
    await tester.pump();

    // Bottom navigation bar is present.
    expect(find.byType(NavigationBar), findsOneWidget);
    expect(find.text('Animals'), findsOneWidget);
    expect(find.text('Settings'), findsOneWidget);

    // Switch to the settings tab (no network involved).
    await tester.tap(find.text('Settings'));
    await tester.pumpAndSettle();

    expect(find.text('Selected Animal'), findsOneWidget);
    expect(find.text('Auto-play'), findsOneWidget);
    expect(find.text('Show image IDs'), findsOneWidget);
  });
}
