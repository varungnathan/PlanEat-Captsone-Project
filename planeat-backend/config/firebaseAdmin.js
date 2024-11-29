const admin = require('firebase-admin');
const serviceAccount = require('../key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://planeatscapstone-default-rtdb.firebaseio.com/',
});

const db = admin.database();
module.exports = db;
