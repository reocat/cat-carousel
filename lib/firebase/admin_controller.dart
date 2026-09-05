import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

import 'firebase_options.dart';

/// Connection lifecycle of the admin area.
enum AdminConnectionStatus {
  /// Firebase hasn't been initialized yet (idle until first visit).
  idle,

  /// Firebase is being initialized (web JS SDK auto-injects here).
  initializing,

  /// Firebase initialized and auth + whitelist streams are live.
  ready,

  /// This build can't talk to Firebase (e.g. not the web build).
  unsupported,

  /// Firebase.initializeApp failed.
  error,
}

/// One document in the Firestore `rootUsers` collection
/// (doc id = user name, field = Firebase Auth uid).
class RootUser {
  final String userName;
  final String uid;

  const RootUser({required this.userName, required this.uid});
}

/// Owns the admin/auth state for the gated Admin tab.
///
/// Firebase is deliberately started lazily — the first time the Admin tab
/// is opened — so the public carousel never pays for the Firebase JS SDK.
/// Mirrors the React app's flow: email/password auth plus a `rootUsers`
/// Firestore whitelist whose members see the admin tools.
class AdminController extends ChangeNotifier {
  bool _started = false;
  AdminConnectionStatus _status = AdminConnectionStatus.idle;
  String? _initError;
  User? _user;
  List<RootUser> _rootUsers = const [];
  bool _whitelistSnapshotReceived = false;
  StreamSubscription<User?>? _authSub;
  StreamSubscription<QuerySnapshot<Map<String, dynamic>>>? _rootUsersSub;

  AdminConnectionStatus get status => _status;
  String? get initError => _initError;
  User? get user => _user;
  bool get isSignedIn => _user != null;
  List<RootUser> get rootUsers => _rootUsers;

  /// Whether the root-users snapshot has arrived at least once, so a signed
  /// in user can be told "you're an admin" or "you're not" with confidence.
  bool get accessChecked => _whitelistSnapshotReceived;

  /// Signed in AND present in the Firestore whitelist.
  bool get isRoot =>
      isSignedIn && _rootUsers.any((r) => r.uid == _user!.uid);

  String? get signedInEmail => _user?.email;

  /// Retry after an initialization failure.
  Future<void> retry() async {
    _started = false;
    await ensureStarted();
  }

  /// Idempotent. Only the web build can talk to this Firebase project
  /// (its config is the web app config from the React repo).
  Future<void> ensureStarted() async {
    if (_started) return;
    _started = true;

    if (!kIsWeb) {
      _status = AdminConnectionStatus.unsupported;
      notifyListeners();
      return;
    }

    _status = AdminConnectionStatus.initializing;
    notifyListeners();

    try {
      await Firebase.initializeApp(options: kFirebaseWebOptions);

      _authSub = FirebaseAuth.instance.authStateChanges().listen((user) {
        _user = user;
        notifyListeners();
      });

      _rootUsersSub = FirebaseFirestore.instance
          .collection('rootUsers')
          .snapshots()
          .listen(
            (snapshot) {
              _rootUsers = snapshot.docs
                  .map((doc) => RootUser(
                        userName: doc.id,
                        uid: (doc.data()['uid'] as String?) ?? '',
                      ))
                  .where((r) => r.uid.isNotEmpty)
                  .toList();
              _whitelistSnapshotReceived = true;
              notifyListeners();
            },
            onError: (_) {
              // If Firestore rules deny reads we still want the UI to stop
              // spinning; the user just won't be treated as a root user.
              _whitelistSnapshotReceived = true;
              notifyListeners();
            },
          );

      _status = AdminConnectionStatus.ready;
      notifyListeners();
    } catch (e) {
      _status = AdminConnectionStatus.error;
      _initError = e.toString();
      notifyListeners();
    }
  }

  /// Throws [FirebaseAuthException] on failure; UI maps it to a message.
  Future<void> signIn(String email, String password) async {
    await FirebaseAuth.instance.signInWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
  }

  /// Creates a plain account (like the React public register page). The
  /// account only gains admin powers once a root user adds it to Firestore.
  Future<void> register(String email, String password) async {
    await FirebaseAuth.instance.createUserWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
  }

  Future<void> signOut() => FirebaseAuth.instance.signOut();

  /// Mirrors the React admin form: creates an Auth user and, when [isRoot]
  /// is checked, writes `rootUsers/{userName}` -> `{uid}` so they show up
  /// in the whitelist immediately (the live snapshot picks it up).
  ///
  /// The matching `rootUserUids/{uid}` marker is written atomically in the
  /// same batch — it is what Firestore rules use to verify that a writer is
  /// itself a root user.
  Future<void> createUser({
    required String userName,
    required String email,
    required String password,
    required bool isRoot,
  }) async {
    final credential = await FirebaseAuth.instance
        .createUserWithEmailAndPassword(email: email.trim(), password: password);
    if (isRoot) {
      final firestore = FirebaseFirestore.instance;
      final batch = firestore.batch();
      batch.set(
        firestore.collection('rootUsers').doc(userName.trim()),
        {'uid': credential.user!.uid},
      );
      batch.set(
        firestore.collection('rootUserUids').doc(credential.user!.uid),
        {'userName': userName.trim()},
      );
      await batch.commit();
    }
  }

  /// Friendly message for common Firebase Auth errors.
  static String describeAuthError(Object error) {
    if (error is FirebaseAuthException) {
      return switch (error.code) {
        'invalid-email' => 'That email address doesn\'t look right, nya~',
        'user-disabled' => 'This account has been disabled.',
        'user-not-found' => 'No account found for that email, nya.',
        'wrong-password' => 'Wrong password, nya~',
        'email-already-in-use' => 'An account already exists for that email.',
        'weak-password' => 'Password should be at least 6 characters, nya.',
        _ => error.message ?? 'Something went wrong, nya.',
      };
    }
    return error.toString();
  }

  @override
  void dispose() {
    _authSub?.cancel();
    _rootUsersSub?.cancel();
    super.dispose();
  }
}
