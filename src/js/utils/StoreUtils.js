import _ from 'lodash';

const createAction = action => {
  return dispatch => {
    dispatch(action);  
    return Promise.resolve();
  }
}
export { createAction };