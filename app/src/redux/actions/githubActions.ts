import { SearchResult } from '../../shared/Types/github/SearchResult';
import { actionCreator, networkActionsCreator } from '../../utils/creator';
import { AsyncAction, Dispatch, StateFetcher } from '../../app-types';
import { publicRequest } from '../../utils/network';
import { searchGithubApi } from '../../config';
import { SearchBody } from '../../shared/models/github/SearchBody';
import SearchArea from '../../shared/models/github/SearchAraea';
import { githubActionTypes } from './actionsTypes';
import { cacheGithubSearch } from './cacheActions';

export const searchGithubActions = networkActionsCreator<SearchResult>(
  githubActionTypes.GITHUB_SEARCH,
);
export const clearSearchGithubPage = actionCreator<string>(
  githubActionTypes.CLEAR_GITHUB_SEARCH_PAGE,
);

export const searchGithub = (searchText: string, searchArea: SearchArea): AsyncAction => async (
  dispatch: Dispatch,
  getState: StateFetcher,
) => {
  try {
    dispatch(searchGithubActions.requesting.action());
    const cacheKey = `${searchArea}:${searchText}`.toLowerCase();
    let cachedResult = getState().cache.searchHistory[cacheKey];
    if (!cachedResult) {
      cachedResult = await publicRequest<SearchBody, SearchResult>({
        url: searchGithubApi,
        method: 'POST',
        data: new SearchBody(searchText, searchArea),
      });
      dispatch(cacheGithubSearch.action([cacheKey, cachedResult]));
    }
    dispatch(searchGithubActions.success.action(cachedResult));
  } catch (e) {
    dispatch(searchGithubActions.failure.action(e));
  }
};
