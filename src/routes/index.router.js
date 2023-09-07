import { Router } from 'express';
import productRouter from './api/products.router.js';
import cartRouter from './api/carts.router.js'
import authRouter from './api/auth.router.js';

const router = Router();

router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/carts',cartRouter);

export default router;