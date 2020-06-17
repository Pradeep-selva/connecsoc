const admin = require('firebase-admin');

var serviceAccount = require("../servicekey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://connecsoc.firebaseio.com"
});

const db = admin.firestore();

module.exports = {
    admin,
    db
}