import { SearchResult } from '../../shared/Types/github/SearchResult';
import { Action } from '../../app-types';
import { cacheGithubSearch, clearGithubSearchCache } from '../actions/cacheActions';
import { NetworkResponse } from '../../utils/network';

export type CacheState = {
  searchHistory: Record<string, NetworkResponse<SearchResult>>;
};

export const defaultState: CacheState = {
  searchHistory: {},
};

const reducer = (state: CacheState = defaultState, { type, payload }: Action): CacheState => {
  switch (type) {
    case clearGithubSearchCache.type:
      return { ...defaultState };
    case cacheGithubSearch.type:
      const [key, value]: [string, NetworkResponse<SearchResult>] = payload;
      return { ...state, searchHistory: { ...state.searchHistory, [key]: value } };
    default:
      return state;
  }
};

export default reducer;
