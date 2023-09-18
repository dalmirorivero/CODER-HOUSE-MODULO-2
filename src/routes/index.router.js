import { Router } from 'express';
import productRouter from './api/products.router.js';
import cartRouter from './api/carts.router.js'
import authRouter from './api/auth.router.js';
import sessionRouter from './api/session.router.js';

const router = Router();

router.use('/products', productRouter);
router.use('/auth', authRouter);
router.use('/carts',cartRouter);
router.use('/sessions', sessionRouter);

export default router;