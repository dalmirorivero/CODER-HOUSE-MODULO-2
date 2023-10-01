import MyRouter from './router.js';
import CartRouter from './mvc/carts.router.js';
import UserRouter from './mvc/users.router.js';
import ProductRouter from './mvc/products.router.js';

const product = new ProductRouter();
const carts = new CartRouter();
const user = new UserRouter();

export default class MVCRouter extends MyRouter{
    init() {
        this.read('/',(req,res) => res.status(200).send(''));
        this.use('/products', product.getRouter());
        this.use('/carts', carts.getRouter());
        this.use('/user', user.getRouter());
    };
};