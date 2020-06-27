const functions = require('firebase-functions');
const app = require('express')();

const { db } = require('./utils/admin')

const {
    getAllPosts,
    pushOnePost,
    getOnePost,
    pushPostComment,
    likePost,
    unlikePost,
    deleteOnePost
} = require('./handler/posts');

const {
    signup,
    login,
    imageUpload,
    postUserData,
    getUserData,
    getPublicUserDetails,
    markNotificationsRead
} = require('./handler/users');

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


exports.api = functions.region('asia-east2').https.onRequest(app);

exports.onLike = functions
    .region('asia-east2')
    .firestore.document(`likes/{id}`)
    .onCreate(snapshot => {
        db.doc(`/posts/${snapshot.data().postId}`)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const notificationData = {
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        type: 'like',
                        postId: doc.id
                    }
                    return db.doc(`notifications/${snapshot.id}`).set(notificationData)
                } else {
                    return;
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.log(err);
                return;
            })
    })

exports.onUnlike = functions
    .region('asia-east2')
    .firestore.document(`likes/{id}`)
    .onDelete(snapshot => {
        db.doc(`notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return;
            })
            .catch(err => {
                console.log(err);
                return;
            })
    })

exports.onComment = functions
    .region('asia-east2')
    .firestore.document(`comments/{id}`)
    .onCreate(snapshot => {
        db.doc(`/posts/${snapshot.data().postId}`)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const notificationData = {
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        type: 'comment',
                        postId: doc.id
                    }
                    return db.doc(`notifications/${snapshot.id}`).set(notificationData)
                } else {
                    return;
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.log(err);
                return;
            })
    })
