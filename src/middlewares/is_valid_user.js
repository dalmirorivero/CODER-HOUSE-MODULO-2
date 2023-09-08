import User from "../models/user.js"

export default async function (req, res, next){
    try {
        const {mail, password} = req.body
        let one = await User.findOne({ mail })
        if (one){
            next ()
        } else{
            return res.status(401).json({
                status: 401,
                method: req.method,
                path: req.url,
                response: 'invalid credential'
            })
        }
    } catch (error) {
        next(error)
    }
};