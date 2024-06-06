// Load environment variables from .env file
require('dotenv').config();

import firebase from 'firebase';
// Required for side-effects
require("firebase/firestore");

var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID  // Add the 'appId' configuration
}

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;

