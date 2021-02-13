/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig, AxiosResponse, Method, AxiosError } from 'axios';
import { apiBaseUrl, environment, logging } from '../config';

const isLogEnabled = environment !== 'production' && logging === true;

const instance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  maxContentLength: 5 * 1000 * 1000, // bytes => 5 MB
});

// Add a request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Do something before request is sent
    if (isLogEnabled)
      console.log('Network Request:', `${config.baseURL}${config.url}`, config.method);
    return config;
  },
  async (error: Error) => {
    if (isLogEnabled) console.error('Network Request:', error);
    throw error;
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (isLogEnabled) console.error('Network Response:', error);
    throw error && error.response && error.response.data;
  },
);

export type NetworkResponse<T extends object | null> = {
  readonly statusCode: string;
  readonly message: string;
  readonly data?: T;
};

export interface NetworkRequest<T extends object | null> {
  url: string;
  method: Method;
  data?: T;
  params?: object;
}

/**
 * @T : Request Body Type
 * @R : Response Body type
 */
export async function publicRequest<T extends object | null, R extends object | null>(
  request: NetworkRequest<T>,
): Promise<NetworkResponse<R>> {
  const { data } = await instance.request<NetworkResponse<R>>(request);
  return data;
}
