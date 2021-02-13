//import UsersDao from '../daos/users.dao';
//import {UserDto} from "../dto/user.model";

import axios, { AxiosRequestConfig } from 'axios';
import {
  resultsLimit,
  searchUserUrl,
  searchRepoUrl,
  redisCacheTime,
  githubApiToken,
} from '../config';
import { UserDto } from '../shared/models/github/UserDto';
import { SearchResponse } from './model/SearchResponse';
import CacheService from '../core/cache';
import _ from 'lodash';
import { RepositoryDto } from '../shared/models/github/RepositoryDto';
import Logger from '../core/Logger';
import { InternalError } from '../core/apiError';

class GithubService {
  private requestConfig: AxiosRequestConfig = {
    headers: {
      ...(githubApiToken && { Authorization: `token ${githubApiToken}` }),
    },
  };

  private static instance: GithubService;
  static getInstance(): GithubService {
    if (!GithubService.instance) {
      GithubService.instance = new GithubService();
    }
    return GithubService.instance;
  }

  async searchUsers(searchString: string): Promise<UserDto[]> {
    try {
      const url = `${searchUserUrl}?q=${encodeURIComponent(searchString)}&per_page=${resultsLimit}`;
      const {
        data: { items },
      } = await axios.get<SearchResponse>(url, this.requestConfig);

      if (items) {
        const userPromises: Promise<UserDto>[] = _.map(items as UserDto[], (user) =>
          this.fetchUser(user.url),
        );
        return await Promise.all(userPromises);
      }
      throw new Error('You have exceed limit of search');
    } catch (err) {
      Logger.error(err.message);
      throw new InternalError(`Search github fail,You have exceed limit of search`);
    }
  }
  async searchRepositories(searchString: string): Promise<RepositoryDto[]> {
    try {
      const url = `${searchRepoUrl}?q=${encodeURIComponent(searchString)}&per_page=${resultsLimit}`;
      const {
        data: { items },
      } = await axios.get<SearchResponse>(url, this.requestConfig);

      if (items) {
        const repos = items as RepositoryDto[];
        const ownerPromises: Promise<UserDto>[] = _.map(repos, (i) => this.fetchUser(i.owner.url));
        const owners: UserDto[] = await Promise.all(ownerPromises);
        return repos.map((repo, i) => new RepositoryDto({ ...repo, owner: owners[i] }));
      }
      throw new Error('You have exceed limit of search');
    } catch (err) {
      Logger.error(err.message);
      throw new InternalError(`Search github fail,You have exceed limit of search`);
    }
  }

  async fetchUser(url: string): Promise<UserDto> {
    return new Promise(async (resolve, reject) => {
      try {
        const cachedUser = await CacheService.get<UserDto>(url);
        if (cachedUser) {
          resolve(cachedUser);
        } else {
          const { data: user } = await axios.get<UserDto>(url, this.requestConfig);
          if (user) {
            // cache fetched user
            const typedUser = new UserDto({ ...user });
            await CacheService.setex<UserDto>(url, redisCacheTime, typedUser);
            resolve(typedUser);
          }
          reject(`fail to fetch user :${url}`);
        }
      } catch (err) {
        reject(`fail to fetch user :${url} Error :${err.message}`);
        Logger.error(`fail to fetch user :${url} Error :${err.message}`);
      }
    });
  }
}

export default GithubService.getInstance();
