const { admin, db } = require('./admin')

module.exports = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split('Bearer ')[1];
    } else {
        return res.status(403).json({ error: "unauthorized" });
    }

    admin.auth().verifyIdToken(token)
        .then(decoded => {
            req.user = decoded;
            console.log(decoded)
            return db.collection('users')
                .where('uid', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            console.log(data.docs[0].data())
            req.user.handle = data.docs[0].data().handle;
            req.user.image = data.docs[0].data().imgUrl;
            return next();
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json(err)
        })

}