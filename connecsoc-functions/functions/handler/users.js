const firebase = require('firebase');
const firebaseConfig = require('../utils/config');
const { db,
    admin } = require('../utils/admin')

firebase.initializeApp(firebaseConfig);

const { signupDataValidator, loginDataValidator } = require('../utils/validations')


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
            if (err.code === "auth/wrong-password")
                return res.status(400).json({ error: "Password and Email dont match" })
            return res.status(500).json({ error: err.code })
        })

}

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