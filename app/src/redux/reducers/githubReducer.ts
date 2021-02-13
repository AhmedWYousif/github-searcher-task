import { SearchResult } from '../../shared/Types/github/SearchResult';
import { Action, Message } from '../../app-types';
import { clearSearchGithubPage, searchGithubActions } from '../actions/githubActions';

export type GithubState = {
  data: SearchResult;
  isFetching: boolean;
  message: Message | null;
};

export const defaultState: GithubState = {
  data: null,
  isFetching: false,
  message: null,
};

const reducer = (state: GithubState = defaultState, { type, payload }: Action): GithubState => {
  switch (type) {
    case clearSearchGithubPage.type:
      return { ...defaultState };
    case searchGithubActions.requesting.type:
      return { ...state, isFetching: true, message: null, data: null };
    case searchGithubActions.failure.type:
      return {
        ...state,
        isFetching: false,
        message: {
          type: 'error',
          text: 'Search github fail,You have exceed limit of search',
        },
      };
    case searchGithubActions.success.type:
      return { ...state, isFetching: false, data: payload.data };
    default:
      return state;
  }
};

export default reducer;
