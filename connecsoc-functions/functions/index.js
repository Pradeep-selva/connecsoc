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

const authMiddleware = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.status(403).json({ error: "unauthorized" });
    }

    admin.auth().verifyIdToken(token)
        .then(decoded => {
            req.user = decoded;
            console.log(decoded)
            return db.collection('users')
                .where('uid', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            return res.status(500).json(err)
        })

}

app.post('/post', authMiddleware, (req, res) => {

    const newPost = {
        userHandle: req.user.handle,
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

const isEmail = (email) => {
    const emailRegEx = /\S+@\S+\.\S+/;

    if (email.match(emailRegEx))
        return true;
    else
        return false;
}

const isEmpty = (data) => {
    if (data.trim() === '')
        return true;
    else
        return false;
}

app.post('/signup', (req, res) => {
    const newUser = {
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    let uid, tok;

    let errors = {}

    if (isEmpty(newUser.email))
        errors.email = 'Must not be empty';
    else if (!(isEmail(newUser.email)))
        errors.email = 'Must be a valid email';

    if (isEmpty(newUser.password))
        errors.password = 'Must not be empty';
    if (newUser.password !== newUser.confirmPassword)
        errors.confirmPassword = 'Confirm password does not match password';

    if (isEmpty(newUser.handle))
        errors.handle = 'Must not be empty';

    if (Object.keys(errors).length > 0)
        return res.status(400).json(errors)

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
            if (err.code === "auth/email-already-in-use")
                return res.status(400).json({ error: "This email is already in use!" })
            return res.status(500).json({ error: err.code })
        })
})

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    let errors = {}

    if (isEmpty(user.email))
        errors.email = 'must not be empty'
    else if (!isEmail(user.email))
        errors.email = 'must be a valid email'
    if (isEmpty(user.password))
        erros.password = 'must not be empty'

    if (Object.keys(errors).length > 0)
        return res.status(400).json(errors)

    firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.status(200).json({ token });
        })
        .catch((err) => {
            if (err.code === "auth/wrong-password")
                return res.status(400).json({ error: "Password and Email dont match" })
            return res.status(500).json({ error: err.code })
        })

})


exports.api = functions.region('asia-east2').https.onRequest(app);