import firebaseAdmin from 'firebase-admin';
import fs from 'fs';

// Read the content of the JSON file synchronously and parse it
const jsonData = JSON.parse(fs.readFileSync('./newshub-01-firebase-adminsdk-j7t1q-8dd3d22759.json', 'utf8'));

// Initialize Firebase Admin SDK with the parsed JSON data
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(jsonData),
  // Add additional configuration options as needed
});

export default firebaseAdmin;
