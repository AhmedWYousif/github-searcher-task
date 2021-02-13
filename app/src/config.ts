declare let process: {
  env: {
    NODE_ENV: string;
    PORT: number;
    API_BASE_URL: string;
    LOGGING: boolean;
    SEARCH_GITHUB_API: string;
    MIN_LENGTH_TO_SEARCH: number;
    SEARCH_DELAY_TIME: number;
  };
};

export const environment = process.env.NODE_ENV || 'development';
export const port = process.env.PORT || 3000;

export const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
export const logging = process.env.LOGGING || true;

// github api endpoints
export const searchGithubApi = process.env.SEARCH_GITHUB_API || '/api/search';
export const minLengthToSearch = process.env.MIN_LENGTH_TO_SEARCH || 3;

export const searchDelayTime: number = process.env.SEARCH_DELAY_TIME || 1500;
