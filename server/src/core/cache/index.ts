import { promisify } from 'util';
import Logger from '../Logger';
import redis, { ClientOpts } from 'redis';
import { redisUrl } from '../../config';

class CacheService {
  getAsync: (key: string) => Promise<string | null>;
  setAsync: (key: string, value: string) => Promise<unknown>;
  setExAsync: (key: string, expire: number, value: string) => Promise<string>;
  flushallAsync: () => Promise<unknown>;
  private static instance: CacheService;

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  constructor() {
    const client = redis.createClient(redisUrl, {} as ClientOpts);
    client
      .on('error', (err) => {
        Logger.error(`Redis DB Error : ${err}`);
      })
      .on('connect', function () {
        Logger.info('Redis DB connected successfully');
      });

    this.getAsync = promisify(client.get).bind(client);
    this.setAsync = promisify(client.set).bind(client);
    this.setExAsync = promisify(client.setex).bind(client);
    this.flushallAsync = promisify(client.flushall).bind(client);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.getAsync(key);
    return value === null ? null : (JSON.parse(value) as T);
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.setAsync(key, JSON.stringify(value));
  }

  async setex<T>(key: string, expire: number, value: T): Promise<void> {
    await this.setExAsync(key, expire, JSON.stringify(value));
  }

  async flushall() {
    await this.flushallAsync();
  }
}

export default CacheService.getInstance();
