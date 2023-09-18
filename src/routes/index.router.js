import { Router } from 'express';
import productRouter from './api/products.router.js';
import sessionRouter from './api/session.router.js';
import cartRouter from './api/carts.router.js'
import authRouter from './api/auth.router.js';

const router = Router();

router.use('/sessions', sessionRouter);
router.use('/products', productRouter);
router.use('/carts',cartRouter);
router.use('/auth', authRouter);

export default router;