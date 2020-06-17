require('dotenv').config()

module.exports = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};