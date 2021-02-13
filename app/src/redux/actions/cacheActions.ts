import { SearchResult } from '../../shared/Types/github/SearchResult';
import { actionCreator } from '../../utils/creator';
import { NetworkResponse } from '../../utils/network';
import { cacheActionTypes } from './actionsTypes';

export const cacheGithubSearch = actionCreator<[string, NetworkResponse<SearchResult>]>(
  cacheActionTypes.CACHE_GITHUB_SEARCH,
);

export const clearGithubSearchCache = actionCreator<string>(
  cacheActionTypes.CLEAR_GITHUB_SEARCH_CACHE,
);
