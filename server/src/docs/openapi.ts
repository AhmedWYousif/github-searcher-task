import SearchArea from '../shared/models/github/SearchAraea';
import { port } from '../config';

export default {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Github Search API Docs',
    description: 'Github Search API Project API',
    contact: {
      name: 'Ahmed Yousif',
      email: 'ahmed.w.yousif@outlook.com',
      url: 'https://www.linkedin.com/in/ahmedwyousif/',
    },
  },
  servers: [
    {
      url: `http://localhost:${port}/api`,
      description: 'Local server',
    },
    {
      url: 'https://api_testing_server',
      description: 'Testing server',
    },
    {
      url: 'https://api_production_server',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Github',
    },
    {
      name: 'Cache',
    },
  ],
  paths: {
    '/clear-cache': {
      post: {
        tags: ['Cache'],
        description: 'Clear redis cache',
        parameters: [],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MessageResponse',
                },
                example: {
                  statusCode: '10000',
                  message: 'Cache Cleared Successfully',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MessageResponse',
                },
                example: {
                  statusCode: '10001',
                  message: 'Clear Cache Fail',
                },
              },
            },
          },
        },
      },
    },
    '/search': {
      post: {
        tags: ['Github'],
        description: 'Search Github for user of repository',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/searchBody',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'List of search results',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/searchBody',
                },
                example: [
                  {
                    id: 67949,
                    name: 'Yasser Dahab',
                    avatar_url: 'https://avatars.githubusercontent.com/u/67949?v=4',
                    url: 'https://api.github.com/users/Yasser',
                    type: 'User',
                    location: 'Denver',
                  },
                  {
                    id: 289031,
                    name: 'Yasser Souri',
                    avatar_url: 'https://avatars.githubusercontent.com/u/289031?v=4',
                    url: 'https://api.github.com/users/yassersouri',
                    type: 'User',
                    location: 'Bonn, Germany',
                  },
                  {
                    id: 1086056,
                    name: 'Yasser Ganjisaffar',
                    avatar_url: 'https://avatars.githubusercontent.com/u/1086056?v=4',
                    url: 'https://api.github.com/users/yasserg',
                    type: 'User',
                    location: 'San Francisco Bay Area',
                  },
                ],
              },
            },
          },
          400: {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MessageResponse',
                },
                example: {
                  statusCode: '10001',
                  message: 'searchArea must be one of [Users, Repositories]',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MessageResponse',
                },
                example: {
                  statusCode: '10001',
                  message: 'Search user fail,You have exceed limit of search',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      searchBody: {
        type: 'object',
        properties: {
          searchText: {
            type: 'string',
            default: 'Ahmed',
          },
          searchArea: {
            type: 'string',
            enum: [`${SearchArea.USERS}`, `${SearchArea.REPOSITORIES}`],
            default: `${SearchArea.USERS}`,
          },
        },
      },
      MessageResponse: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};
