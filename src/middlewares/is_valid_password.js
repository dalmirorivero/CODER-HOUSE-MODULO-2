import bcrypt from 'bcryptjs';
import User from '../dao/models/user.js';

export default async function (req, res, next){
    let passwordForm = req.body.password
    let user = await User.findOne({ mail:req.body.mail})
    let passwordHash = user.password 
    let verified = bcrypt.compareSync(passwordForm, passwordHash)
    if (verified){
        return next ()
    } else {
        return res.status(401).json({
            status: 401,
                method: req.method,
                path: req.url,
                response: 'invalid credential'
        })
    }
}