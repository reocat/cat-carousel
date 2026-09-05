import 'package:flutter/material.dart';
import '../config/config.dart';

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