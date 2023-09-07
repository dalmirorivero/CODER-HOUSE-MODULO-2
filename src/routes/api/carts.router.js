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

// cartRouter.post('/add', async (req, res) => {
//     try {
//         const { userId, productId, quantity } = req.body;
    
//         // Aquí puedes agregar lógica para verificar la existencia del usuario si es necesario
    
//         const cart = await CartManager.CartManageraddToCart(userId, productId, quantity);
    
//         res.status(200).json({ message: 'Producto agregado al carrito.', cart });
//       } catch (error) {
//         res.status(500).json({ message: 'Error al agregar al carrito.' });
//       }
// });

export default cartRouter;