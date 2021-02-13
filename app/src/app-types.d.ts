import { Action as ReduxAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './redux/reducers';

declare interface Action<T = any> {
  readonly type: string;
  readonly payload?: T;
}

declare type Dispatch<T = any> = (_: Action<T>) => void;

declare type StateFetcher = () => RootState;

declare type AsyncAction = ThunkAction<void, RootState, unknown, ReduxAction<string>>;

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

export type Message = {
  text: string;
  type: 'success' | 'warning' | 'error' | 'info';
};
