import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {

    const auth = req.headers.authorization
    if (!auth) {
        return res.status(401).json({
            succes: false,
            message: 'Unauthorized.'
        })
    };

    const token = auth.split(' ')[1]
    jwt.verify(token, process.env.SECRETKEY, async (error, credentials) => {
            try {
                let user = await User.findOne({ mail : credentials.mail })
                req.user = user
                return next()
            } catch (error) {
                return res.status(401).json({
                    succes: false,
                    message: 'Unauthorized.'
                })
            }
        }
    );
};