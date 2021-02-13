import express from 'express';
import githubController from '../../controllers/github.controller';
import validator from '../../utils/validator';
import search from './schema';
import asyncHandler from '../../utils/asyncHandler';

const router = express.Router();

export default router.post(
  '/',
  validator(search.searchBody),
  asyncHandler(githubController.search.bind(githubController)),
);
