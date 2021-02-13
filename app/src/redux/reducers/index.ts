import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import githubReducer, { GithubState } from './githubReducer';
import cacheReducer, { CacheState } from './cacheReducer';

export type RootState = {
  github: GithubState;
  cache: CacheState;
};

export const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = combineReducers<RootState>({
  github: githubReducer,
  cache: cacheReducer,
});

export default rootReducer;
