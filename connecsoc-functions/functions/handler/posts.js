const { db } = require('../utils/admin')

// GET /posts
exports.getAllPosts = (req, res) => {

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

}

// POST /post
exports.pushOnePost = (req, res) => {

    const newPost = {
        userHandle: req.user.handle,
        userImg: req.user.image,
        body: req.body.body,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0
    }

    db.collection('posts')
        .add(newPost)
        .then(doc => {
            const postData = newPost;
            postData.id = doc.id;
            return res.status(201).json(postData);
        })
        .catch(err => {
            res.status(500).json({
                error: 'something went wrong'
            });
            console.log(err)
        })

}

//GET /post/:postId
exports.getOnePost = (req, res) => {
    let postData = {};

    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({ error: "Post not found" });
            }
            postData = doc.data();
            return db.collection('comments')
                .orderBy('createdAt', 'desc')
                .where('postId', '==', req.params.postId)
                .get()
        })
        .then(data => {
            postData.comments = [];

            data.forEach(doc => {
                postData.comments.push(doc.data());
            })
            return res.status(200).json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.code })
        })
}

//DELETE /post/:postId
exports.deleteOnePost = (req, res) => {
    const document = db.doc(`/posts/${req.params.postId}`);

    document.get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(400).json({ error: "Post not found" });
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(400).json({ error: "unauthorised" });
            }
            else {
                return document.delete();
            }
        })
        .then(() => {
            return res.status(200).json({
                message: "Post deleted succesfully"
            });
        })
        .catch(err => {
            return res.status(500).json({ error: err.code })
        })
}

//POST /post/:postId/comment
exports.pushPostComment = (req, res) => {
    if (req.body.body.trim() === '')
        return res.status(403).json({ error: 'Field cannot be empty' });

    const commentData = {
        bio: req.body.body,
        createdAt: new Date().toISOString(),
        postId: req.params.postId,
        userHandle: req.user.handle,
        userImg: req.user.image
    };

    db.doc(`/posts/${commentData.postId}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(403).json({ error: "Post not found" });
            }

            return doc.ref.update({
                commentCount: doc.data().commentCount + 1
            })
        })
        .then(() => {
            return db.collection('comments')
                .add(commentData);
        })
        .then(() => {
            return res.status(201).json(commentData);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err.code });
        })
}

//GET /post/:postId/like
exports.likePost = (req, res) => {
    const likeDoc = db.collection('likes')
        .where('postId', '==', req.params.postId)
        .where('userHandle', '==', req.user.handle)
        .limit(1);

    const postDoc = db.doc(`/posts/${req.params.postId}`);
    let postData;

    postDoc.get()
        .then(doc => {
            if (doc.exists) {
                postData = doc.data();
                postData.id = doc.id;
                return likeDoc.get();
            }
            return res.status(400).json({ error: "Post does not exist" });
        })
        .then(data => {
            if (data.empty) {
                return db.collection('likes').add({
                    postId: req.params.postId,
                    userHandle: req.user.handle
                })
                    .then(() => {
                        postData.likeCount++;
                        return postDoc.update({
                            likeCount: postData.likeCount
                        })
                    })
                    .then(() => {
                        return res.status(200).json(postData);
                    })
            } else {
                return res.status(400).json({ error: "Post already liked" });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err.code });
        })
}

//GET /post/:postId/unlike
exports.unlikePost = (req, res) => {
    const likeDoc = db.collection('likes')
        .where('postId', '==', req.params.postId)
        .where('userHandle', '==', req.user.handle)
        .limit(1);

    const postDoc = db.doc(`/posts/${req.params.postId}`);
    let postData;

    postDoc.get()
        .then(doc => {
            if (doc.exists) {
                postData = doc.data();
                postData.id = doc.id;
                return likeDoc.get()
            }
            return res.status(400).json({ error: "Post does not exist" });
        })
        .then(data => {
            if (data.empty) {
                return res.status(400).json({ error: "Post not liked" })
            } else {
                console.log(data.docs[0].data());
                return db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        postData.likeCount--;
                        return postDoc.update({
                            likeCount: postData.likeCount
                        })
                    })
                    .then(() => {
                        return res.status(200).json(postData)
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err.code });
        })
}
