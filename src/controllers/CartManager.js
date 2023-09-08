import Cart from '../models/cart.js';
import Product from '../models/product.js';

const cartManager = {
  // CREATE
  createCart: async (req, res) => {
    try {
      const cartData = req.body;
      const newCart = await Cart.create(cartData);
      res.json({ status: 'success', cart: newCart });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error creating new cart' });
    }
  },
  // READ
  getCarts: async (req, res) => {
    try {
      const carts = await Cart.find().populate({
        path: 'products.product',
        model: Product,
      })

      carts.forEach(cart => {
        cart.products.sort((productA, productB) => {
          const titleA = productA.product.title;
          const titleB = productB.product.title;
          return titleA.localeCompare(titleB);
        });
      });

      res.json({ status: 'success', carts });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error getting carts' });
    }
  },
  getCartById: async (req, res) => {
    try {
      const cid = req.params.id;
      const cart = await Cart.findById(cid).populate({
        path: 'products.product',
        model: Product,
      })
      if (!cart) {
        res.status(404).json({ status: 'error', message: 'Cart not found' });
      } else {
        let total = 0;
        cart.products.forEach(cart => {
          total += cart.product.price * cart.quantity;
        });
        res.json({ status: 'success', cart, total });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error getting cart' });
    }
  },
  // DELETE
  deleteCart: async (req, res) => {
    try {
      const cid = req.params.id;
      const deletedCart = await Cart.findByIdAndDelete(cid)
      if (!deletedCart) {
        res.status(404).json({ status: 'error', message: 'Cart not found' });
      } else {
        res.json({ status: 'success', message: 'Cart deleted' });
      }
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error deleting product' });
    }
  },
}

export default cartManager;