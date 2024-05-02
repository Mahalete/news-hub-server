// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('./firebaseAdmin');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example API route
app.get('/api/news', (req, res) => {
  // Your logic to fetch news from Firestore or external API
  res.json({ message: 'News data from backend' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
