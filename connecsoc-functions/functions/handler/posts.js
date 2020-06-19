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