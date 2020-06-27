const firebase = require('firebase');
const firebaseConfig = require('../utils/config');
const { db,
    admin } = require('../utils/admin')

firebase.initializeApp(firebaseConfig);

const { signupDataValidator,
    loginDataValidator,
    reduceUserData } = require('../utils/validations')

// POST /signup
exports.signup = (req, res) => {
    const newUser = {
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    let uid, tok;
    const noImg = 'gravatar.png';

    const { errors, isValid } = signupDataValidator(newUser)

    if (!isValid)
        return res.status(403).json(errors)


    db.doc(`/users/${newUser.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: "handle is already in use" })
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            uid = data.user.uid;
            return data.user.getIdToken();
        })
        .then(token => {
            tok = token;
            let userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imgUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
                uid
            }

            return db.doc(`/users/${userCredentials.handle}`)
                .set(userCredentials)
        })
        .then(() => {
            return res.status(200).json({ token: tok })
        })
        .catch(err => {
            if (err.code === "auth/email-already-in-use")
                return res.status(400).json({ error: "This email is already in use!" })
            return res.status(500).json({ error: err.code })
        })
}

// POST /login
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const { errors, isValid } = loginDataValidator(user)

    if (!isValid)
        return res.status(403).json(errors)


    firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.status(200).json({ token });
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({ general: "Wrong credentials entered" })
        })

}

// POST /user
exports.postUserData = (req, res) => {
    userData = reduceUserData(req.body);

    db.doc(`users/${req.user.handle}`)
        .update(userData)
        .then(() => {
            return res.status(200).json({ message: "Details added succesfully!" });
        })
        .catch(err => {
            console.log(error)
            return res.status(500).json({ error: err.code })
        })
}

//GET /user/:handle
exports.getPublicUserDetails = (req, res) => {
    let userData = {}

    db.doc(`users/${req.params.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                userData.user = doc.data();
                return db.collection('posts')
                    .where('userHandle', '==', req.params.handle)
                    .orderBy('createdAt', 'desc')
                    .get();
            } else {
                return res.status(400).json({ error: "User not found" })
            }
        })
        .then(data => {
            userData.posts = []

            data.forEach(doc => {
                userData.posts.push({
                    postId: doc.id,
                    userHandle: doc.data().userHandle,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt
                })
            })

            return res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ error: err.code })
        })
}

//GET /user
exports.getUserData = (req, res) => {
    let userData = {};

    db.doc(`users/${req.user.handle}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db.collection('likes')
                    .where('userHandle', '==', req.user.handle)
                    .get();
            }
            return {}
        })
        .then(data => {
            userData.likes = [];
            data.forEach(doc => {
                userData.likes.push(doc.data());
            })

            return db.collection('notifications')
                .where('recipient', '==', req.user.handle)
                .orderBy('createdAt', 'desc')
                .get()
        })
        .then(data => {
            userData.notifications = [];
            data.forEach(doc => {
                userData.notifications.push({
                    notificationId: doc.id,
                    read: doc.data().read,
                    postId: doc.data().postId,
                    createdAt: doc.data().createdAt,
                    recipient: doc.data().recipient,
                    sender: doc.data().sender,
                    type: doc.data().type
                });
            })

            return res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: err.code });
        })
}

//POST /user/image
exports.imageUpload = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({ headers: req.headers });

    let imgFileName;
    let imageToUpload = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname);
        console.log(filename);
        console.log(mimetype);

        if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
            return res.status(403).json({ error: 'Only PNG/JPEG files can be submitted' })
        }

        const imgExtension = filename.split('.')[filename.split('.').length - 1];

        const imgName = Math.round(Math.random() * 10000000000);
        imgFileName = `${imgName}.${imgExtension}`;
        const filepath = path.join(os.tmpdir(), imgFileName);

        imageToUpload = {
            filepath,
            mimetype
        };

        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin.storage()
            .bucket(`${firebaseConfig.storageBucket}`)
            .upload(imageToUpload.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToUpload.mimetype
                    }
                }
            })
            .then(() => {
                const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imgFileName}?alt=media`;

                return db.doc(`users/${req.user.handle}`)
                    .update({
                        imgUrl
                    });
            })
            .then(() => {
                return res.status(201).json({ message: "image uploaded succesfully!" })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ error: err.code })
            });
    });

    busboy.end(req.rawBody);

}

//POST /notifications
exports.markNotificationsRead = (req, res) => {
    let batch = db.batch();

    req.body.forEach(notificationId => {
        const notification = db.doc(`notifications/${notificationId}`)
        batch.update(notification, { read: true })
    })

    batch.commit()
        .then(() => {
            return res.status(200).json({ message: "Notifications marked read" })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: err.code })
        })
}