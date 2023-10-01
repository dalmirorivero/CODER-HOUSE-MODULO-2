import { Router } from 'express';
import authRouter from './api/auth.router.js';
import cartRouter from './api/carts.router.js';
import sessionRouter from './api/session.router.js';
import productRouter from './api/products.router.js';

const router = Router();

router.use('/sessions', sessionRouter);
router.use('/products', productRouter);
router.use('/carts',cartRouter);
router.use('/auth', authRouter);

export default router;