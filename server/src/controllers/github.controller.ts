import { Request, Response, NextFunction } from 'express';
import { redisCacheTime } from '../config';
import { SuccessResponse } from '../core/apiResponse';
import CacheService from '../core/cache';
import githubService from '../services/github.service';
import SearchArea from '../shared/models/github/SearchAraea';
import { SearchResult } from '../shared/Types/github/SearchResult';

class GithubController {
  private static instance: GithubController;

  static getInstance(): GithubController {
    if (!GithubController.instance) {
      GithubController.instance = new GithubController();
    }
    return GithubController.instance;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async search(req: Request, res: Response, next: NextFunction) {
    const { searchArea, searchText }: { searchArea: SearchArea; searchText: string } = req.body;
    const cacheKey = `${searchArea}:${searchText}`.toLowerCase();
    let searchResult: SearchResult = [];
    // get response from cache
    const cachedSearchResult = await CacheService.get<SearchResult>(cacheKey);
    if (cachedSearchResult) {
      searchResult = cachedSearchResult;
    } else {
      switch (searchArea) {
        case SearchArea.REPOSITORIES:
          searchResult = await githubService.searchRepositories(searchText);
          break;
        case SearchArea.USERS:
        default:
          searchResult = await githubService.searchUsers(searchText);
          break;
      }
      // cache fetched data
      await CacheService.setex<SearchResult>(cacheKey, redisCacheTime, searchResult);
    }

    //Logger.info(searchResult);
    new SuccessResponse('Search Successfully', searchResult).send(res);
  }
}

export default GithubController.getInstance();
