const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.PROJECT_ID,
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const db = admin.firestore();

module.exports = { db };