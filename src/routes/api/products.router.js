import { Router } from 'express';
import productManager from '../../controllers/ProductManager.js';
import is_admin from '../../middlewares/is_admin.js';
import passport_call from '../../middlewares/passport_call.js';

const productRouter = Router ();

// DEVUELVE TODOS LOS PRODUCTOS ( http://localhost:8080/api/products/ )
productRouter.get('/', productManager.getProducts);
// RENDERIZADO DE VISTA, FORMULARIO DE CREACION ( http://localhost:8080/api/products/new/ )
productRouter.get('/new', productManager.newProduct);
// DEVUELVE UN PRODUCTO SELECCIONADO POR ID ( http://localhost:8080/api/products/:id/ )
productRouter.get('/:id', productManager.getProductsById);
// CREA UN NUEVO PRODUCTO ( http://localhost:8080/api/products/ )
productRouter.post('/', passport_call('jwt'), is_admin, productManager.createProduct);
// ACTUALIZA UN PRODUCTO SELECCIONADO POR ID ( http://localhost:8080/api/products/:id/ )
productRouter.put('/:id', productManager.updateProduct);
// ELIMINA UN PRODUCTO SELECCIONADO POR ID ( http://localhost:8080/api/products/:id/ )
productRouter.delete('/:id', productManager.deleteProduct);

export default productRouter;