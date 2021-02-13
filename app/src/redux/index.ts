/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['github'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const getStore = () => {
  const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default getStore;
