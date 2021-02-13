import { Request, Response } from 'express';
import { InternalErrorResponse, SuccessMsgResponse } from '../core/apiResponse';
import CacheService from '../core/cache';

class CacheController {
  private static instance: CacheController;

  static getInstance(): CacheController {
    if (!CacheController.instance) {
      CacheController.instance = new CacheController();
    }
    return CacheController.instance;
  }

  async clearCache(req: Request, res: Response) {
    try {
      await CacheService.flushall();
    } catch (err) {
      new InternalErrorResponse('Clear Cache Fail');
    }
    new SuccessMsgResponse('Clear Cache Successfully').send(res);
  }
}

export default CacheController.getInstance();
