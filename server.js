require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS — replace '*' with your actual frontend URL when deploying
app.use(cors({
  origin: [
    'http://127.0.0.1:5502',  // local
    'http://localhost:5052',   // local
    'https://gimpex.com'    ,   // production
    'https://fasihnasirgimpex.netlify.app'

  ]
}));
app.use(express.json());

// Secret key middleware
function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Protected Firebase config endpoint
app.get('/api/firebase-config', requireApiKey, (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  });
});

// Health check (no auth needed)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});