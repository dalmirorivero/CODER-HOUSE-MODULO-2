import passport from 'passport';
import MyRouter from '../router.js';
import CartController from '../../controllers/mvc/carts.controller.js';

const cartController = new CartController();

export default class CartRouter extends MyRouter {
    init() {
        this.create('/', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                let user = req.user
                let data = req.body
                data.user_id = user._id
                let response = await cartController.createController(data)
                return res.sendSuccesCreate(response)
            } catch (error) {
                next(error)
            }
        });
        
        this.read('/', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                let user_id = req.user._id
                let state = 'pending'
                if (req.query.state) {
                    state = req.query.state
                }
                let response = await cartController.readController(user_id, state)
                if (response) {
                    return res.sendSucces(response)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
            }
        });
    }
};