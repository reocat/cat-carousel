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

    // Accent picker: orange is the default, so exactly one swatch is checked.
    expect(find.text('Accent color'), findsOneWidget);
    expect(find.text('Use device colors'), findsOneWidget);
    expect(find.byIcon(Icons.check_rounded), findsOneWidget);

    // The device-accent toggle defaults ON; without any device/browser accent
    // in tests, the picked (orange) seed still applies.
    final Finder deviceSwitch = find.widgetWithText(SwitchListTile, 'Use device colors');
    expect(tester.widget<SwitchListTile>(deviceSwitch).value, isTrue);

    // Turn device colors OFF so the picked swatch always wins.
    await tester.ensureVisible(deviceSwitch);
    await tester.pumpAndSettle();
    await tester.tap(deviceSwitch);
    await tester.pumpAndSettle();
    expect(tester.widget<SwitchListTile>(deviceSwitch).value, isFalse);

    // Tapping a swatch repaints the app theme with that seed color.
    await tester.ensureVisible(find.byKey(const ValueKey('accent-Red')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('accent-Red')));
    await tester.pumpAndSettle();

    final MaterialApp app = tester.widget<MaterialApp>(find.byType(MaterialApp));
    final ColorScheme expected = ColorScheme.fromSeed(seedColor: Colors.red);
    expect(app.theme!.colorScheme.primary, expected.primary);
  });
}
