const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllPosts,
    pushOnePost
} = require('./handler/posts');

const {
    signup,
    login,
    imageUpload
} = require('./handler/users');

const authMiddleware = require('./utils/middleware');


app.get('/posts', getAllPosts);
app.post('/post', authMiddleware, pushOnePost);

app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', authMiddleware, imageUpload);


exports.api = functions.region('asia-east2').https.onRequest(app);