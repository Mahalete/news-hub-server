import express from 'express';
import admin from './firebaseAdmin.js';

const router = express.Router();

// Define the logout route
router.post('/logout', async (req, res) => {
  try {
    // Check if the Authorization header exists
    if (!req.headers.authorization) {
      throw new Error('Authorization header is missing');
    }

    // Extract the Firebase ID token from the request
    const idToken = req.headers.authorization.split('Bearer ')[1];

    // Verify the ID token and decode its payload
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Log the decoded token for debugging
    console.log('Decoded token:', decodedToken);

    // Perform the logout action (optional)

    // Respond with success message
    res.status(200).send({ message: 'Logout successful' });
  } catch (error) {
    // Handle errors
    console.error('Error logging out:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

export default router;
