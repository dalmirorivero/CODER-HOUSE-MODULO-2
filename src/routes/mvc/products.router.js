import MyRouter from '../router.js';
import ProductController from '../../controllers/mvc/products.controller.js';

const productController = new ProductController();

export default class ProductRouter extends MyRouter {
    init() {
        this.create('/', async (req, res, next) => {
            try {
                let data = req.body
                let response = await productController.createController(data)
                return res.sendSuccessCreate(response)
            } catch (error) {
                next(error)
            }
        });

        this.read('/', async (req, res, next) => {
            try {
                let response = await productController.readController()
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
            }
        });

        this.read('/:id', async (req, res, next) => {
            try {
                let { id } = req.params
                let response = await productController.readOneController(id)
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
            }
        });

        this.update('/:id', async (req, res, next) => {
            try {
                let { id } = req.params;
                let data = req.body;
                let response = await productController.updateController(id, data)
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
            }
        });

        this.delete('/:id', async (req, res, next) => {
            try {
                let { id } = req.params;
                let response = await productController.deleteController(id);
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound()
                }
            } catch (error) {
                next(error)
            }
        });
    }
};