import 'package:firebase_core/firebase_core.dart';

/// Web app configuration for the shared Firebase project
/// (`cat-carousel-reocat`), mirrored from the React app's
/// `firebaseConfig.js` so both apps talk to the same project, auth
/// users, and Firestore `rootUsers` collection.
const FirebaseOptions kFirebaseWebOptions = FirebaseOptions(
  apiKey: 'AIzaSyAxgouaIua7rNwLGoAaDGbt8qxg1mKXIKE',
  appId: '1:214645684655:web:1b7d74c102a5031f69975a',
  messagingSenderId: '214645684655',
  projectId: 'cat-carousel-reocat',
  authDomain: 'cat-carousel-reocat.firebaseapp.com',
  storageBucket: 'cat-carousel-reocat.appspot.com',
  measurementId: 'G-Y9EYP42B9Y',
);
