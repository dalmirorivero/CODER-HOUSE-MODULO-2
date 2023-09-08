import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    let token = jwt.sign({ mail: req.body.mail }, process.env.SECRETKEY, { expiresIn: 60 * 60 * 24 })
    req.session.token = token
    return next()
};