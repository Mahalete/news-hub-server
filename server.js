// Import required modules
import express from 'express';
import cors from 'cors';
import admin from './firebaseAdmin.js'; // Assuming this is your Firebase Admin initialization code

const firestore = admin.firestore();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint for user registration (sign-up)
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    console.log('User created successfully:', userRecord.uid); // Log the UID of the created user

    await firestore.collection('users').doc(userRecord.uid).set({
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Failed to create user:', error); // Log any error during user creation
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Endpoint for user login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email); // Log the email attempting to log in

    const user = await admin.auth().getUserByEmail(email);
    const firebaseToken = await admin.auth().createCustomToken(user.uid);

    res.status(200).json({ token: firebaseToken, user: { email: user.email, uid: user.uid } });
    console.log('Login successful for email:', email); // Log the email after successful login
  } catch (error) {
    console.error('Authentication failed:', error); // Log any authentication failure
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Endpoint for saving favorite articles
app.post('/api/favorites', async (req, res) => {
  const { userId, favorites } = req.body;

  try {
    await firestore.collection('users').doc(userId).update({
      favorites: admin.firestore.FieldValue.arrayUnion(...favorites)
    });

    res.status(200).send('Favorites updated successfully');
  } catch (error) {
    console.error('Failed to update favorites:', error); // Log any error during favorite update
    res.status(500).send('Failed to update favorites');
  }
});

// Endpoint for retrieving favorite articles
app.get('/api/favorites/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    console.log(`Retrieving favorite articles for user: ${userId}`);
    const userRef = firestore.collection('users').doc(userId);
    const doc = await userRef.get();
    if (doc.exists) {
      const favorites = doc.data().favorites || [];
      console.log(`Number of favorite articles for user ${userId}: ${favorites.length}`);
      res.status(200).json(favorites);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Failed to fetch favorite articles:', error);
    res.status(500).json({ error: 'Failed to fetch favorite articles' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
