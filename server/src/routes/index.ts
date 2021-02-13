import express from 'express';
import githubRoute from './github';
import cacheRoute from './cache';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/openapi';

const router = express.Router();

router.use('/search', githubRoute);

router.use('/clear-cache', cacheRoute);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
