import passport from 'passport';
import MyRouter from '../router.js';
import create_token from '../../middlewares/create_token.js';
import is_valid_user from '../../middlewares/is_valid_user.js';
import AuthController from '../../controllers/mvc/users.controller.js';
import is_valid_password from '../../middlewares/is_valid_password.js';


const authController = new AuthController();

export default class AuthRouter extends MyRouter {
    init() {
        this.create('/register', is_valid_user, async (req, res, next) => {
            try {
                let data = req.body
                let response = await authController.registerController(data)
                return res.sendSuccessCreate(response)
            } catch (error) {
                next(error)
            }
        });

        this.create('/login', is_valid_password, create_token, async (req, res, next) => {
            try {
                let user = req.user
                let token = req.token
                req.session.mail = req.body.mail
                req.session.role = req.user.role
                let response = await authController.loginController(user)
                return res
                .cookie("token", token, {
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                    httpOnly: true,
                })
                .sendSuccessCreate(response);
            } catch (error) {
                next(error)
            }
        });

        this.create('/logout', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                req.session.destroy()
                let response = await authController.logoutController()
                return res.clearCookie('token').sendSuccessCreate(response)
            } catch (error) {
                next(error)
            }
        });

        this.read('/', async (req, res, next) => {
            try {
                let response = await authController.readController()
                if (response){
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound('users')
                }
            } catch (error) {
                next(error)
            }
        });

        this.read('/one', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                let data = req.user
                return res.sendSuccess({
                    message: 'User found.',
                    response: data
                })
            } catch (error) {
                next(error)
            }
        });

        this.update('/', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                let { mail } = req.user
                let data = req.body
                let response = await authController.updateController(mail, data)
                if (response){
                    return res.sendSuccess(response)
                } else {
                return res.sendNotFound('user')
                }
            } catch (error) {
                next(error)
            }
        });

        this.delete('/', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                let { mail } = req.user
                let response = await authController.deleteController(mail)
                if (response){
                    req.session.destroy()
                    response.response.password = null
                    return res.clearCookie("token").sendSuccess(response)
                } else {
                    return res.sendNotFound('user')
                }
            } catch (error) {
                next(error)
            }
        });
    }
};