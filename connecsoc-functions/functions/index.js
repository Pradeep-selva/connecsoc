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
        return db.doc(`/posts/${snapshot.data().postId}`)
            .get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
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
            .catch(err => {
                console.log(err);
            })
    })

exports.onUnlike = functions
    .region('asia-east2')
    .firestore.document(`likes/{id}`)
    .onDelete(snapshot => {
        return db.doc(`notifications/${snapshot.id}`)
            .delete()
            .then(() => {
                return;
            })
            .catch(err => {
                console.log(err);
            })
    })

exports.onComment = functions
    .region('asia-east2')
    .firestore.document(`comments/{id}`)
    .onCreate(snapshot => {
        return db.doc(`/posts/${snapshot.data().postId}`)
            .get()
            .then(doc => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
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
            .catch(err => {
                console.log(err);
            })
    })

exports.onUserImageUpdate = functions
    .region('asia-east2')
    .firestore.document(`/users/{id}`)
    .onUpdate(change => {
        console.log(change.before.data().imgUrl);
        console.log(change.after.data().imgUrl);

        if (change.after.data().imgurl !== change.before.data().imgUrl) {
            const batch = db.batch()
            console.log("user image changed")

            db.collection('posts')
                .where('userHandle', '==', change.before.data().handle)
                .get()
                .then(data => {
                    data.forEach(doc => {
                        console.log(doc.id)
                        const post = db.doc(`posts/${doc.id}`)
                        batch.update(post, { userImg: change.after.data().imgUrl })
                    })
                    return batch.commit()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("user image not changed")
            return true;
        }
    })

exports.onPostDelete = functions
    .region('asia-east2')
    .firestore.document(`/posts/{postId}`)
    .onDelete((snapshot, context) => {
        const postId = context.params.postId;
        const batch = db.batch()

        return db.collection('likes')
            .where('postId', '==', postId)
            .get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`likes/${doc.id}`))
                })
                return db.collection('comments')
                    .where('postId', '==', postId)
                    .get()
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`comments/${doc.id}`))
                })
                return db.collection('notifications')
                    .where('postId', '==', postId)
                    .get()
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`notifications/${doc.id}`))
                })
                return batch.commit()
            })
            .catch(err => {
                console.log(err)
            })
    })
