const isEmail = (email) => {
    const emailRegEx = /\S+@\S+\.\S+/;

    if (email.match(emailRegEx))
        return true;
    else
        return false;
}

const isEmpty = (data) => {
    if (data.trim() === '')
        return true;
    else
        return false;
}

// POST /signup
exports.signupDataValidator = (newUser) => {
    let errors = {}

    if (isEmpty(newUser.email))
        errors.email = 'Must not be empty';
    else if (!(isEmail(newUser.email)))
        errors.email = 'Must be a valid email';

    if (isEmpty(newUser.password))
        errors.password = 'Must not be empty';
    if (newUser.password !== newUser.confirmPassword)
        errors.confirmPassword = 'Confirm password does not match password';

    if (isEmpty(newUser.handle))
        errors.handle = 'Must not be empty';


    return {
        errors,
        isValid: Object.keys(errors).length === 0 ? true : false
    }
}

// POST /login
exports.loginDataValidator = (user) => {
    let errors = {}

    if (isEmpty(user.email))
        errors.email = 'must not be empty';
    else if (!isEmail(user.email))
        errors.email = 'must be a valid email';
    if (isEmpty(user.password))
        erros.password = 'must not be empty';

    return {
        errors,
        isValid: Object.keys(errors).length === 0 ? true : false
    }
}

// POST /user
exports.reduceUserData = (data) => {
    let userData = {};

    if (!isEmpty(data.bio))
        userData.bio = data.bio;

    if (!isEmpty(data.website)) {
        let website = data.website;
        if (website.substring(0, 4) !== "http")
            userData.website = `http://${website}`;
        else
            userData.website = website;
    }

    if (!isEmpty(data.location))
        userData.location = data.location;

    return userData;
}