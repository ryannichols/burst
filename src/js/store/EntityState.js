import reselect from 'reselect';
import _ from 'lodash';

import {
  get,
  post,
  putS3 } from 'api/APIUtils';
import { SocketEvent } from 'constants/AppConstants';
import { MediaUtils } from 'utils/Utils';
import { FileType, RequestState } from 'constants/AppConstants' ;
import {
  selectChannels,
  selectChannel } from 'store/Selectors';

var { SUCCESS } = RequestState;

// EXAMPLE
//export const FETCH_LIVE = 'FETCH_LIVE';

// Operation type to apply to entities and lists
export const OPERATION_ADD = 'OPERATION_ADD';
export const OPERATION_REMOVE = 'OPERATION_REMOVE';
export const OPERATION_REPLACE = 'OPERATION_REPLACE';

// List of action types that denote a delete operation.
// Actions include locally generated actions and socket generated actions
const DeleteActions = {
  //[DELETE_POST]: "postcards",
  //[DELETE_SCHEDULE]: "schedules",
  //[DELETE_SCHEDULE_MEDIA]: "schedule_media",
};
const DeleteActionKeys = _.keys(DeleteActions);


function getOperation(action, entity_type) {
  if(_.includes(DeleteActionKeys, action.type) && DeleteActions[action.type] === entity_type) {
    if(action.result && action.result === SUCCESS) {
        return OPERATION_REMOVE;
    } else if(action.result) {
      return OPERATION_ADD;
    } else {
      return OPERATION_REMOVE;
    }
  }
  return OPERATION_ADD;
}


const EntityActions = {
  /*
  EXAMPLE
  fetchLive() {
    return dispatch => get("/live/list", null, dispatch, FETCH_LIVE);
  },
  */
};



// REDUCERS
function entity_reducer(entities = {}, new_entities, entity_action = OPERATION_ADD) {
  if (new_entities == undefined || new_entities.length == 0)
    return entities;

  if(entity_action === OPERATION_ADD) {
    return Object.assign({}, entities, _.keyBy(new_entities, 'id'));
  } else if(entity_action === OPERATION_REMOVE) {
    let ids = _.map(new_entities, 'id');
    return _.keyBy(_.reject(entities, e => _.includes(ids, e.id)), 'id');
  }
}



const EntityState = {

  /* INITIALIZER */
  spec: {
    /* 
    Example:
    liveStreams: {},
    Users: {}
    */
  },

  /* REDUCER */
  reducer(state = this.spec, action) {
    if (action.json == undefined || action.json.body == undefined) return state;
    /* 
    Example:
    var json = action.json.body;
    if(json.live) {
      state = Object.assign({}, state, { liveStreams: entity_reducer(state.liveStreams, json.live) });
    }
    */
    return state;
  },
};

_.bindAll(EntityActions, _.functions(EntityActions));
_.bindAll(EntityState, _.functions(EntityState));
export { EntityState, EntityActions, getOperation };
