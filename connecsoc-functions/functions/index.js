const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();
const db = admin.firestore();


app.get('/posts', (req, res) => {

    db.collection('posts')
        .get()
        .then(data => {
            let posts = [];

            data.forEach(doc => {
                posts.push(doc.data());
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


exports.api = functions.https.onRequest(app);