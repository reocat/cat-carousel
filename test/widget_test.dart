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

    // Theme picker: default follows the system; picking Dark flips the app.
    expect(find.text('Theme'), findsOneWidget);
    await tester.ensureVisible(find.text('Theme'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Theme'));
    await tester.pumpAndSettle();
    expect(find.text('Select theme'), findsOneWidget);
    await tester.tap(find.text('Dark'));
    await tester.pumpAndSettle();
    expect(
      tester.widget<MaterialApp>(find.byType(MaterialApp)).themeMode,
      ThemeMode.dark,
    );

    // The device-accent toggle defaults ON, which hides the accent picker
    // (the device accent wins; the swatches are only used as the fallback seed).
    expect(find.text('Use device colors'), findsOneWidget);
    final Finder deviceSwitch = find.widgetWithText(SwitchListTile, 'Use device colors');
    expect(tester.widget<SwitchListTile>(deviceSwitch).value, isTrue);
    expect(find.text('Accent color'), findsNothing);
    expect(find.byIcon(Icons.check_rounded), findsNothing);

    // Turning device colors OFF reveals the accent picker.
    await tester.ensureVisible(deviceSwitch);
    await tester.pumpAndSettle();
    await tester.tap(deviceSwitch);
    await tester.pumpAndSettle();
    expect(tester.widget<SwitchListTile>(deviceSwitch).value, isFalse);
    expect(find.text('Accent color'), findsOneWidget);
    // Orange is the default, so exactly one swatch is checked.
    expect(find.byIcon(Icons.check_rounded), findsOneWidget);

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
