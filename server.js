import express from 'express';
import cors from 'cors';
import admin from './firebaseAdmin.js';

const app = express();

// Initialize Firestore
const db = admin.firestore();

// Initialize Firebase Authentication
const auth = admin.auth();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the cors middleware to allow requests from all origins
app.use(cors());

// Endpoint for user registration (sign-up)
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user with email and password
    const userRecord = await auth.createUser({
      email: email,
      password: password
    });

    console.log('Successfully created new user:', userRecord.uid);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Endpoint for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt with email:', email);

    // Sign in user with email and password
    const userCredential = await admin.auth().getUserByEmail(email);
    const user = userCredential.toJSON();

    console.log('User found:', user);

    // Check password (Firebase Admin SDK does not support password verification directly)
    // You will need to handle password verification logic or use Firebase Authentication client SDK for this part.

    // Assuming password verification is handled separately and user is authenticated successfully
    console.log('User logged in:', user.uid);
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Failed to login' });
  }
});

// Endpoint for user logout
app.post('/api/logout', async (req, res) => {
  try {
    // Sign out the currently signed-in user
    await auth.signOut();

    console.log('User logged out');
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

// Endpoint for saving favorite articles
app.post('/api/saveFavorite', async (req, res) => {
  console.log('Received request to save favorite article');
  
  const { userId, article } = req.body;
  
  console.log('User ID:', userId);
  console.log('Article:', article);

  try {
    // Save the article to Firestore
    await db.collection('favorites').doc(userId).collection('articles').add(article);

    console.log('Article saved as favorite:', article.title);
    res.status(200).json({ message: 'Article saved as favorite' });
  } catch (error) {
    console.error('Error saving article as favorite:', error);
    res.status(500).json({ error: 'Failed to save article as favorite' });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
