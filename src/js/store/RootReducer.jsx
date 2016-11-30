import { combineReducers } from 'redux';

import { EntityState } from 'store/EntityState';
import { RouteState } from 'store/RouteState';
import { AppState } from 'store/AppState';

var rootReducer = combineReducers({
  entities: EntityState.reducer,
  routing: RouteState.reducer,
  app: AppState.reducer,
});
export { rootReducer as default };