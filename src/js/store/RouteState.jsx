import _ from 'lodash';
import { routerReducer, LOCATION_CHANGE, routerActions } from 'react-router-redux';
import { browserHistory } from 'react-router';



// Expose the route action to reducers if we want it
const ROUTE_INIT = '@@router/INIT_PATH';
const ROUTE_CHANGED = LOCATION_CHANGE;

const history = browserHistory;

/* ACTIONS */
const RouteActions = {
  pushPath: routerActions.push,
  replacePath: routerActions.replace,
}

const RouteState = {
  // We use the reducer supplied by redux-router
  reducer: routerReducer,

  /* SELECTOR */
  selector: state => state.router,
};
_.bindAll(RouteActions, _.functions(RouteActions));
export {
  RouteActions,
  RouteState,
  ROUTE_CHANGED,
  ROUTE_INIT,
  history };


