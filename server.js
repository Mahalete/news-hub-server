// Import required modules
import express from 'express';
import cors from 'cors';
import admin from './firebaseAdmin.js'; // Assuming this is your Firebase Admin initialization code

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Endpoint for user registration (sign-up)
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user with email and password
    const userRecord = await admin.auth().createUser({
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
  try {
    const { email, password } = req.body;

    // Authenticate user
    const user = await admin.auth().getUserByEmail(email); // Fetch user details
    // You can use your authentication logic here

    // Generate Firebase ID token
    const firebaseToken = await admin.auth().createCustomToken(user.uid);

    // Respond with Firebase ID token and user data
    res.status(200).json({ token: firebaseToken, user: { email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// Endpoint for user logout
app.post('/api/logout', async (req, res) => {
  try {
    console.log('Received logout request');
    // No need to sign out the user here as it's handled client-side with Firebase Authentication
    console.log('User logged out');
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

// Endpoint for saving favorite articles
// This endpoint remains unchanged...

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
