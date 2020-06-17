const firebase = require('firebase');
const firebaseConfig = require('../utils/config');
const { db } = require('../utils/admin')

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