const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors')

app.use(cors());

//Imports
const {
    getAllPosts,
    pushOnePost,
    getOnePost,
    pushPostComment,
    likePost,
    unlikePost,
    deleteOnePost
} = require('./handlers/posts');

const {
    signup,
    login,
    imageUpload,
    postUserData,
    getUserData,
    getPublicUserDetails,
    markNotificationsRead
} = require('./handlers/users');

const {
    on_like,
    on_unlike,
    on_comment,
    on_user_image_update,
    on_post_delete
} = require('./handlers/db_triggers');

const authMiddleware = require('./utils/middleware');

//post routes
app.get('/posts', getAllPosts);
app.post('/post', authMiddleware, pushOnePost);
app.get('/post/:postId', authMiddleware, getOnePost);
app.delete('/post/:postId', authMiddleware, deleteOnePost);
app.post('/post/:postId/comment', authMiddleware, pushPostComment);
app.get('/post/:postId/like', authMiddleware, likePost);
app.get('/post/:postId/unlike', authMiddleware, unlikePost);

//user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', authMiddleware, imageUpload);
app.post('/user', authMiddleware, postUserData);
app.get('/user', authMiddleware, getUserData);
app.get('/user/:handle', getPublicUserDetails);
app.post('/notifications', authMiddleware, markNotificationsRead);

//Exporting firebase functions
exports.api = functions.region('asia-east2').https.onRequest(app);

exports.onLike = functions
    .region('asia-east2')
    .firestore.document(`likes/{id}`)
    .onCreate(on_like);

exports.onUnlike = functions
    .region('asia-east2')
    .firestore.document(`likes/{id}`)
    .onDelete(on_unlike);

exports.onComment = functions
    .region('asia-east2')
    .firestore.document(`comments/{id}`)
    .onCreate(on_comment);

exports.onUserImageUpdate = functions
    .region('asia-east2')
    .firestore.document(`/users/{id}`)
    .onUpdate(on_user_image_update);

exports.onPostDelete = functions
    .region('asia-east2')
    .firestore.document(`/posts/{postId}`)
    .onDelete(on_post_delete);
