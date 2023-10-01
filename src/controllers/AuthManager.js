import User from '../dao/models/user.js';

const authManager = {
    // REGISTRO
    registerUser: async (req, res, next) => {
        try {
            let one = await User.create(req.body)
            return res.status(201).json({
                success: true,
                message: 'New user registered.',
                user_id: one._id
            })
        } catch (error) {
            next(error)
        }
    },
    // VISTA DEL REGISTRO
    newUser: (req, res) => {
        res.render('register');
    },
    // INICIO DE SESION
    logIn: async (req, res, next) => {
        try {
            req.session.mail = req.body.mail;
            let one = await User.findOne({ mail: req.body.mail })
            req.session.role = one.role
            return res.status(200).json({
                session: req.session,
                message: req.session.mail + ' logged in successfully.'
            })
        } catch (error) {
            next(error)
        }
    },
    // VISTA DEL INICIO DE SESION
    signIn: (req, res) => {
        res.render('signin');
    },
    // CIERRE DE SESION
    logOut: async (req, res, next) => {
        try {
            req.session.destroy()
            return res.status(200).clearCookie('token').json({
                succes: true,
                message: 'User logged out.',
                dataSession: req.session
            })
        } catch (error) {
            next(error)
        }
    },
    // REGISTRO PASSPORT
    signUp: async (req, res, next) => {
        try {
            return res.status(201).json({
                succes: true,
                message: 'New user registered.',
                user_id: req.user._id
            })
        } catch (error) {
            next(error)
        }
    },
    // INICIO DE SESION PASSPORT
    logOn: async (req, res, next) => {
        try {
            req.session.mail = req.body.mail;
            req.session.role = req.user.role;
            return res.status(200).cookie(
                'token',
                req.session.token,
                { maxAge: 60 * 60 * 24 * 7 * 1000 }
            ).json({
                session: req.session,
                user: req.user,
                message: req.session.mail + ' logged in successfully.',
                token: req.session.token
            })
        } catch (error) {
            next(error)
        }
    },
    // INICIO DE SESION GITHUB
    callback: (req, res, next) => {
        try {
            req.session.mail = req.user.mail;
            req.session.role = req.user.role;
            return res.status(200).json({
                succes: true,
                user: req.user
            })
        } catch (error) {
            next(error)
        }
    }
};

export default authManager