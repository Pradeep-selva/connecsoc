const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllPosts,
    pushOnePost
} = require('./handler/posts');

const {
    signup,
    login,
    imageUpload,
    postUserData,
    getUserData
} = require('./handler/users');

const authMiddleware = require('./utils/middleware');

//post routes
app.get('/posts', getAllPosts);
app.post('/post', authMiddleware, pushOnePost);

//user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', authMiddleware, imageUpload);
app.post('/user', authMiddleware, postUserData);
app.get('/user', authMiddleware, getUserData);


exports.api = functions.region('asia-east2').https.onRequest(app);