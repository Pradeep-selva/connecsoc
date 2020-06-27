const { db } = require('../utils/admin')

exports.on_like = (snapshot) => {
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
}

exports.on_unlike = (snapshot) => {
    return db.doc(`notifications/${snapshot.id}`)
        .delete()
        .then(() => {
            return;
        })
        .catch(err => {
            console.log(err);
        })
}

exports.on_comment = (snapshot) => {
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
}

exports.on_user_image_update = (change) => {
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
}

exports.on_post_delete = (snapshot, context) => {
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
}