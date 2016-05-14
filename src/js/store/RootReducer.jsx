import { combineReducers } from 'redux';


import { RouteState } from 'store/RouteState';

var rootReducer = combineReducers({
  routing: RouteState.reducer,
});
export { rootReducer as default };