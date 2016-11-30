
import { createSelector } from 'reselect';
import _ from 'lodash';


import { DEFAULT_ENV } from 'constants/AppConstants';

const CLOSE_MODAL = 'CLOSE_MODAL';
const SHOW_MODAL = 'SHOW_MODAL';
const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

const AppActions = {
  fetchAppData() {
  },

      // MODALS
  closeModal() {
    return (dispatch, getState) => {

      // Remove modal information from URL if it's present
      // This means the modal was presented based off a URL and we want to revert to raw path.
      var state = getState();
      var location = selectLocation(state);
      var query = location.query;
      var key = query ? query.modal : undefined;

      if(key) {
        dispatch(RouteActions.pushPath(location.pathname));
      } 
      return dispatch({
        type: CLOSE_MODAL,
      });
    }
  },

  checkEnvironment() {
    return dispatch => {
      var env = window.localStorage.getItem("env") ? window.localStorage.getItem("env") : DEFAULT_ENV;
      return dispatch(this.setEnvironment(env));
    }
  },

  setEnvironment(env) {
    window.localStorage.setItem("env", env);
    return createAction({
      type: SET_ENVIRONMENT,
      environment: env
    });
  },

  // Shows a modal when passed an entire modal component
  // Deeper child components can show custom modals, and have event hooks and respond to that components events
  // Normally should be no coupaling, and modals should change state and children respond to that. Occasional it's needed though.
  showModal(type, component) {
    var key = _.findKey(ModalURLKeys, v => v === type);
    return createAction({
      type: SHOW_MODAL,
      modalComponent: component,
    });
  },

  // Shows a modal based on Modal constant (type)
  // The app will manage the modal, no even hooks are needed, etc
  showModalType(type, props) {
    var key = _.findKey(ModalURLKeys, v => v === type);
    return createAction({
      type: SHOW_MODAL,
      modalType: type,
      props,
    });
  },
}

const spec = {
  modal: {component:null, transIn:null, transOut:null, type:null, props:null},
  environment: DEFAULT_ENV,
  errorMessage: null,
};

var AppState = {
  reducer(state = spec, action) {
    switch (action.type) {
      case CLOSE_MODAL :
        return _.assign({}, state, { modal: spec.modal });
      case SET_ENVIRONMENT:
        return _.assign({}, state, { environment: action.environment });
      case SHOW_MODAL :
        return _.assign({}, state, { 
          modal: { 
            type: action.modalType, 
            component: action.modalComponent, 
            transIn: action.modalType, 
            transOut: state.modal.type, 
            props: action.props },
        });
      default:
        return state;
    }
  },

  selector: createSelector(
    [
      state => state.app, //viewModel
    ],
    (
      viewModel,
    ) => {
      return {
        ...viewModel,
      }
    }
  )
}

_.bindAll(AppActions, _.functions(AppActions));

export {
  AppState,
  AppActions, 
}