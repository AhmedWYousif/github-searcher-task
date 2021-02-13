import express from 'express';
import asyncHandler from '../../utils/asyncHandler';
import cacheController from '../../controllers/cache.controller';
const router = express.Router();

export default router.post('/', asyncHandler(cacheController.clearCache.bind(cacheController)));
