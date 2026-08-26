import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import contentRoutes from './content.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/', contentRoutes);

export default router;
