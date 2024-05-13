import admin from './firebaseAdmin.js';
import firebaseAdmin from './firebaseAdmin.js';

import express from 'express';

const app = express();

// Initialize Firestore
const db = admin.firestore();

// Example API route to fetch news data
app.get('/api/news', async (req, res) => {
  try {
    // Query Firestore for news collection
    const snapshot = await db.collection('news').get();
    
    // Extract data from snapshot
    const newsData = [];
    snapshot.forEach((doc) => {
      newsData.push(doc.data());
    });

    res.json({ news: newsData });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default app;
