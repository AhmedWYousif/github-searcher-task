declare let process: {
  env: {
    NODE_ENV: string;
    PORT: number;
    REDIS_URL: string;
    REDIS_CACHE_TIME: number;
    CORS_URL: string;
    LOG_DIR: string;
    SEARCH_USER_API: string;
    SEARCH_REPO_API: string;
    GITHUB_API_TOKEN: string;
    SEARCH_RESULTS_LIMIT: number;
  };
};

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 8000;

export const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
export const redisCacheTime = process.env.REDIS_CACHE_TIME || 7200;

export const corsUrl = process.env.CORS_URL || 'http://localhost:3000';
export const logDirectory = process.env.LOG_DIR || '/logs';

// github api endpoints
export const searchUserUrl = process.env.SEARCH_USER_API || 'https://api.github.com/search/users';
export const searchRepoUrl =
  process.env.SEARCH_REPO_API || 'https://api.github.com/search/repositories';

export const githubApiToken = process.env.GITHUB_API_TOKEN || undefined;

export const resultsLimit = process.env.SEARCH_RESULTS_LIMIT || 9;
