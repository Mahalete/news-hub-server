const admin = require('firebase-admin');
const serviceAccount = require('./config/newshub-01-firebase-adminsdk-j7t1q-8dd3d22759.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://your-firebase-project.firebaseio.com' // Replace with your database URL
});

module.exports = admin;
