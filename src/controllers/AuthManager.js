import User from '../models/user.js';

const authManager = {

registerUser: async (req, res, next) => {
    try {
        let one = await User.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'user registered',
            user_id: one._id
        })
    } catch (error) {
        next (error)
    }
},
newUser: (req, res) => {
    res.render('register'); 
},
logIn: async (req, res, next) => {
    try{
        req.session.mail = req.body.mail
        let one = await User.findOne({mail: req.body.mail})
        req.session.role = one.role
        return res.status(200).json({
            session: req.session,
            message: req.session.mail + ' inicio sesion correctamente.'
    })
    } catch (error) {
        next(error)
    }
},
signIn: (req, res) => {
    res.render('signin'); 
},
logOut: async (req,res, next) => {
    try{
        req.session.destroy()
        return res.status(200).json({
            succes:true,
            message: 'El usuario cerro sesion.',
            dataSession: req.session
        })
    }
    catch (error){
        next(error)
    }
}
};

export default authManager