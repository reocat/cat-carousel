import 'package:flutter/material.dart';

import '../firebase/admin_controller.dart';

/// Gated admin tab. Anyone can browse, but the admin tools (root-user
/// management) are only shown to signed-in members of the Firestore
/// `rootUsers` whitelist — mirroring the React app's `/config` page.
class AdminPage extends StatefulWidget {
  const AdminPage({super.key});

  @override
  State<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  final AdminController _controller = AdminController();
  bool _showRegister = false;
  bool _busy = false;
  String? _formError;

  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();

  // Admin "create user" form fields.
  final TextEditingController _userName = TextEditingController();
  final TextEditingController _newUserEmail = TextEditingController();
  final TextEditingController _newUserPassword = TextEditingController();
  bool _makeRoot = true;

  @override
  void initState() {
    super.initState();
    _controller.ensureStarted();
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    _userName.dispose();
    _newUserEmail.dispose();
    _newUserPassword.dispose();
    _controller.dispose();
    super.dispose();
  }

  Future<void> _submitAuthForm() async {
    setState(() { _busy = true; _formError = null; });
    try {
      if (_showRegister) {
        await _controller.register(_email.text, _password.text);
      } else {
        await _controller.signIn(_email.text, _password.text);
      }
    } catch (e) {
      setState(() => _formError = AdminController.describeAuthError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _submitCreateUser() async {
    setState(() { _busy = true; _formError = null; });
    try {
      await _controller.createUser(
        userName: _userName.text,
        email: _newUserEmail.text,
        password: _newUserPassword.text,
        isRoot: _makeRoot,
      );
      // Clear the form so another user can be added easily.
      _userName.clear();
      _newUserEmail.clear();
      _newUserPassword.clear();
      _makeRoot = true;
    } catch (e) {
      setState(() => _formError = AdminController.describeAuthError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Scaffold(
          body: CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              const SliverAppBar.medium(
                title: Text('Admin', style: TextStyle(fontWeight: FontWeight.w800)),
                centerTitle: true,
                stretch: true,
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: _buildContent(),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  List<Widget> _buildContent() {
    switch (_controller.status) {
      case AdminConnectionStatus.idle:
      case AdminConnectionStatus.initializing:
        return const [
          SizedBox(height: 120),
          Center(child: CircularProgressIndicator()),
          SizedBox(height: 16),
          Center(child: Text('Connecting…')),
        ];

      case AdminConnectionStatus.unsupported:
        return [_buildInfoCard('Admin tools run in the web build of this app, nya~')];

      case AdminConnectionStatus.error:
        return [
          _buildInfoCard(
            'Could not reach Firebase: ${_controller.initError}',
            action: FilledButton.icon(
              onPressed: _controller.retry,
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('Try again'),
            ),
          ),
        ];

      case AdminConnectionStatus.ready:
        return _buildReadyContent();
    }
  }

  List<Widget> _buildReadyContent() {
    final controller = _controller;
    if (!controller.isSignedIn) {
      return [
        _buildAuthCard(),
        const SizedBox(height: 16),
        _buildInfoCard(
          'Signing in only matters for admin tools — browsing animals '
          'stays open to everyone, nya~',
          icon: Icons.visibility_outlined,
        ),
      ];
    }

    if (!controller.accessChecked) {
      return const [
        SizedBox(height: 120),
        Center(child: CircularProgressIndicator()),
        SizedBox(height: 16),
        Center(child: Text('Checking admin access…')),
      ];
    }

    if (!controller.isRoot) {
      return [
        _buildSignedInCard(),
        const SizedBox(height: 16),
        _buildInfoCard(
          'You\'re signed in, but this account isn\'t on the admin list. '
          'Ask a root user to add you, nya~',
          icon: Icons.lock_outline,
        ),
        const SizedBox(height: 16),
        OutlinedButton.icon(
          onPressed: controller.signOut,
          icon: const Icon(Icons.logout_rounded),
          label: const Text('Sign out'),
        ),
      ];
    }

    // Root user: show the user-management tools.
    return [
      _buildSignedInCard(),
      const SizedBox(height: 16),
      _buildSettingsGroup([
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
          child: Row(
            children: [
              Icon(Icons.group_rounded, color: Theme.of(context).colorScheme.primary),
              const SizedBox(width: 10),
              const Text(
                'Root users',
                style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
              ),
            ],
          ),
        ),
        if (controller.rootUsers.isEmpty)
          const Padding(
            padding: EdgeInsets.fromLTRB(16, 8, 16, 16),
            child: Text('No root users yet, nya~'),
          )
        else
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
            child: Column(
              children: [
                for (final root in controller.rootUsers)
                  ListTile(
                    dense: true,
                    leading: const Icon(Icons.person_rounded),
                    title: Text(root.userName),
                    subtitle: Text(root.uid),
                    trailing: const Icon(Icons.verified_rounded,
                        color: Colors.green),
                  ),
              ],
            ),
          ),
      ]),
      const SizedBox(height: 16),
      _buildCreateUserCard(),
    ];
  }

  Widget _buildSignedInCard() {
    return _buildSettingsGroup([
      ListTile(
        leading: const Icon(Icons.account_circle_rounded),
        title: const Text('Signed in'),
        subtitle: Text(_controller.signedInEmail ?? ''),
        trailing: TextButton.icon(
          onPressed: _controller.signOut,
          icon: const Icon(Icons.logout_rounded, size: 18),
          label: const Text('Sign out'),
        ),
      ),
    ]);
  }

  Widget _buildAuthCard() {
    return _buildSettingsGroup([
      Padding(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 4),
        child: Row(
          children: [
            Icon(
              _showRegister ? Icons.person_add_rounded : Icons.login_rounded,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(width: 10),
            Text(
              _showRegister ? 'Create account' : 'Admin sign in',
              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
            ),
          ],
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(20, 12, 20, 4),
        child: TextField(
          controller: _email,
          keyboardType: TextInputType.emailAddress,
          autocorrect: false,
          decoration: const InputDecoration(
            labelText: 'Email',
            prefixIcon: Icon(Icons.mail_outline_rounded),
            border: OutlineInputBorder(),
          ),
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 4),
        child: TextField(
          controller: _password,
          obscureText: true,
          onSubmitted: (_) => _submitAuthForm(),
          decoration: const InputDecoration(
            labelText: 'Password',
            prefixIcon: Icon(Icons.lock_outline_rounded),
            border: OutlineInputBorder(),
          ),
        ),
      ),
      if (_formError != null)
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 0),
          child: Text(
            _formError!,
            style: TextStyle(color: Theme.of(context).colorScheme.error),
          ),
        ),
      Padding(
        padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
        child: FilledButton.icon(
          onPressed: _busy ? null : _submitAuthForm,
          icon: _busy
              ? const SizedBox(
                  width: 16, height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2))
              : Icon(_showRegister
                  ? Icons.person_add_rounded
                  : Icons.login_rounded),
          label: Text(_showRegister ? 'Create account' : 'Sign in'),
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
        child: TextButton(
          onPressed: _busy
              ? null
              : () {
                  setState(() {
                    _showRegister = !_showRegister;
                    _formError = null;
                  });
                },
          child: Text(_showRegister
              ? 'Already have an account? Sign in'
              : 'Need an account? Register'),
        ),
      ),
    ]);
  }

  Widget _buildCreateUserCard() {
    return _buildSettingsGroup([
      Padding(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 4),
        child: Row(
          children: [
            Icon(Icons.person_add_alt_1_rounded,
                color: Theme.of(context).colorScheme.primary),
            const SizedBox(width: 10),
            const Text(
              'Register new user',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
            ),
          ],
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 4),
        child: TextField(
          controller: _userName,
          autocorrect: false,
          decoration: const InputDecoration(
            labelText: 'User name',
            prefixIcon: Icon(Icons.badge_outlined),
            border: OutlineInputBorder(),
          ),
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
        child: TextField(
          controller: _newUserEmail,
          keyboardType: TextInputType.emailAddress,
          autocorrect: false,
          decoration: const InputDecoration(
            labelText: 'Email',
            prefixIcon: Icon(Icons.mail_outline_rounded),
            border: OutlineInputBorder(),
          ),
        ),
      ),
      Padding(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
        child: TextField(
          controller: _newUserPassword,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Password',
            prefixIcon: Icon(Icons.lock_outline_rounded),
            border: OutlineInputBorder(),
          ),
        ),
      ),
      SwitchListTile(
        title: const Text('Root user'),
        subtitle: const Text('Grant admin access to this account'),
        value: _makeRoot,
        onChanged: _busy ? null : (v) => setState(() => _makeRoot = v),
        secondary: const Icon(Icons.admin_panel_settings_outlined),
      ),
      if (_formError != null)
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
          child: Text(
            _formError!,
            style: TextStyle(color: Theme.of(context).colorScheme.error),
          ),
        ),
      Padding(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
        child: FilledButton.icon(
          onPressed: _busy ? null : _submitCreateUser,
          icon: _busy
              ? const SizedBox(
                  width: 16, height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2))
              : const Icon(Icons.person_add_rounded),
          label: const Text('Create user'),
        ),
      ),
    ]);
  }

  Widget _buildInfoCard(String message, {IconData icon = Icons.info_outline, Widget? action}) {
    return _buildSettingsGroup([
      Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Icon(icon, size: 36, color: Theme.of(context).colorScheme.primary),
            const SizedBox(height: 12),
            Text(message, textAlign: TextAlign.center),
            if (action != null) ...[
              const SizedBox(height: 12),
              action,
            ],
          ],
        ),
      ),
    ]);
  }

  Widget _buildSettingsGroup(List<Widget> children) {
    return Material(
      color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
      borderRadius: BorderRadius.circular(24),
      clipBehavior: Clip.antiAlias,
      child: Column(children: children),
    );
  }
}
