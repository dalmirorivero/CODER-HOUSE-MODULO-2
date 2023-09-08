import bcrypt from 'bcryptjs';

export default function (req, res, next) {
    let passwordForm = req.body.password
    let passwordHash = bcrypt.hashSync(passwordForm, bcrypt.genSaltSync(10))
    req.body.password = passwordHash
    return next()
};