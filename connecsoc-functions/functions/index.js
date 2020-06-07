const functions = require('firebase-functions');
const firebase = require('firebase');
const admin = require('firebase-admin');
const app = require('express')();
require('dotenv').config()

var firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};


firebase.initializeApp(firebaseConfig);

var serviceAccount = require("./servicekey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://connecsoc.firebaseio.com"
});
const db = admin.firestore();


app.get('/posts', (req, res) => {

    db.collection('posts')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let posts = [];

            data.forEach(doc => {
                posts.push({
                    postId: doc.id,
                    handle: doc.data().userHandle,
                    body: doc.data().body
                });
            });

            return res.status(200).json(posts);

        })
        .catch(err => {
            console.log(err);
        })

})

app.post('/post', (req, res) => {

    const newPost = {
        userHandle: req.body.userHandle,
        body: req.body.body,
        createdAt: new Date().toISOString()
    }

    db.collection('posts')
        .add(newPost)
        .then(doc => {
            res.status(201).json({
                message: `document with id ${doc.id} has been created successfully.`
            });
            return null;
        })
        .catch(err => {
            res.status(500).json({
                error: 'something went wrong'
            });
            console.log(err)
        })

})

app.post('/signup', (req, res) => {
    const newUser = {
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    let uid, tok;

    db.doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: "handle is already in use" })
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            uid = data.user.uid;
            return data.user.getIdToken();
        })
        .then(token => {
            tok = token;
            let userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                uid
            }

            return db.doc(`/users/${userCredentials.handle}`)
                .set(userCredentials)
        })
        .then(() => {
            return res.status(200).json({ token: tok })
        })
        .catch(err => {
            return res.status(500).json({ error: err.code })
        })
})


exports.api = functions.region('asia-east2').https.onRequest(app);