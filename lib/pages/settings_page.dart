import 'package:flutter/material.dart';
import '../config/config.dart';

/// Preset seed colors offered in the accent picker.
const List<(Color, String)> _accentOptions = [
  (Colors.orange, 'Orange'),
  (Colors.red, 'Red'),
  (Colors.pink, 'Pink'),
  (Colors.purple, 'Purple'),
  (Colors.indigo, 'Indigo'),
  (Colors.blue, 'Blue'),
  (Colors.cyan, 'Cyan'),
  (Colors.teal, 'Teal'),
  (Colors.green, 'Green'),
  (Colors.amber, 'Amber'),
];

class SettingsPage extends StatefulWidget {
  final AppConfig config;

  const SettingsPage({super.key, required this.config});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: widget.config,
      builder: (context, child) {
        return Scaffold(
          body: CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers:[
              const SliverAppBar.medium(
                title: Text('Settings', style: TextStyle(fontWeight: FontWeight.w800)),
                centerTitle: true,
                stretch: true,
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      _buildSettingsGroup([
                        ListTile(
                          title: const Text('Selected Animal'),
                          subtitle: Text(widget.config.selectedApi.label),
                          leading: const Icon(Icons.pets_rounded),
                          trailing: const Icon(Icons.chevron_right_rounded),
                          onTap: () => _showApiPicker(),
                        ),
                      ]),
                      const SizedBox(height: 16),
                      _buildSettingsGroup([
                        SwitchListTile(
                          title: const Text('Auto-play'),
                          value: widget.config.autoPlay,
                          onChanged: (v) => widget.config.autoPlay = v,
                          secondary: const Icon(Icons.auto_awesome_rounded),
                        ),
                        const Divider(height: 1, indent: 16, endIndent: 16),
                        SwitchListTile(
                          title: const Text('Show image IDs'),
                          value: widget.config.showImageIds,
                          onChanged: (v) => widget.config.showImageIds = v,
                          secondary: const Icon(Icons.tag_rounded),
                        ),
                      ]),
                      const SizedBox(height: 16),
                      _buildSettingsGroup([
                        SwitchListTile(
                          title: const Text('Use device colors'),
                          subtitle: const Text('Prefer your wallpaper or device/browser accent color'),
                          value: widget.config.useSystemAccent,
                          onChanged: (v) => widget.config.useSystemAccent = v,
                          secondary: const Icon(Icons.wallpaper_rounded),
                        ),
                        const Divider(height: 1, indent: 16, endIndent: 16),
                        ListTile(
                          title: const Text('Accent color'),
                          subtitle: const Text('Fallback when no device or browser accent is available'),
                          leading: const Icon(Icons.palette_outlined),
                        ),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
                          child: Wrap(
                            spacing: 14,
                            runSpacing: 14,
                            children: [
                              for (final (color, name) in _accentOptions)
                                _buildAccentSwatch(context, color, name),
                            ],
                          ),
                        ),
                      ]),
                      const SizedBox(height: 100),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildAccentSwatch(BuildContext context, Color color, String name) {
    // Compare ARGB values, not Color identity: Colors.orange (a MaterialColor)
    // is not == to a plain Color(0xFFFF9800) even with the same value.
    final bool selected = widget.config.accentColor.toARGB32() == color.toARGB32();
    final ColorScheme scheme = Theme.of(context).colorScheme;
    final bool dark = ThemeData.estimateBrightnessForColor(color) == Brightness.dark;
    return Tooltip(
      message: name,
      child: Semantics(
        label: name,
        button: true,
        selected: selected,
        child: InkWell(
          key: ValueKey('accent-$name'),
          customBorder: const CircleBorder(),
          onTap: () => widget.config.accentColor = color,
          child: Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: color,
              border: Border.all(
                color: selected ? scheme.primary : scheme.outlineVariant,
                width: selected ? 3 : 1,
              ),
            ),
            child: selected
                ? Icon(Icons.check_rounded, size: 22, color: dark ? Colors.white : Colors.black)
                : null,
          ),
        ),
      ),
    );
  }

  Widget _buildSettingsGroup(List<Widget> children) {
    // Material (not a colored Container) so ListTile ink splashes render
    // correctly and don't trip debug-mode assertions.
    return Material(
      color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
      borderRadius: BorderRadius.circular(24),
      clipBehavior: Clip.antiAlias,
      child: Column(children: children),
    );
  }

void _showApiPicker() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Select API'),
        content: RadioGroup<ApiOption>(
          groupValue: widget.config.selectedApi,
          onChanged: (val) {
            if (val != null) {
              widget.config.selectedApi = val;
              Navigator.pop(context);
            }
          },
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: ApiOption.values.map((api) => RadioListTile<ApiOption>(
              title: Text(api.label),
              value: api,
            )).toList(),
          ),
        ),
      ),
    );
  }
}