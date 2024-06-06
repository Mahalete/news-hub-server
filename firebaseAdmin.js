import firebaseAdmin from 'firebase-admin';
import serviceAccount from './firebase-admin-key.json' assert { type: 'json' }; // Path to your service account key file

// Check if Firebase Admin SDK has already been initialized
if (!firebaseAdmin.apps.length) {
  // Initialize Firebase Admin SDK with your service account credentials
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    // Add additional configuration options as needed
  });
}

export default firebaseAdmin;
