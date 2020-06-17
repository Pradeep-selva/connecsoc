const { db } = require('../utils/admin')

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