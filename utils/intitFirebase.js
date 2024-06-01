const admin = require('firebase-admin');
var serviceAccount = require(".././virtual-academy-f4599-firebase-adminsdk-jcydh-c2640cf7fd.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

module.exports.db = db;