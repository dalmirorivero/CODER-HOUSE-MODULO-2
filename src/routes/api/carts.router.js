import { Router } from 'express';
import cartManager from '../../controllers/CartManager.js';

const cartRouter = Router ();

// DEVUELVE TODOS LOS CARRITOS ( http://localhost:8080/api/carts/ )
cartRouter.get('/', cartManager.getCarts);
// DEVUELVE UN CARRITO POR ID ( http://localhost:8080/api/carts/:id/ )
cartRouter.get('/:id', cartManager.getCartById);
// CREA UN NUEVO CARRITO ( http://localhost:8080/api/carts/create/ )
cartRouter.post('/create', cartManager.createCart);
// ELIMINA UN CARRITO POR ID ( http://localhost:8080/api/carts/:id/ )
cartRouter.delete('/:id', cartManager.deleteCart)

export default cartRouter;