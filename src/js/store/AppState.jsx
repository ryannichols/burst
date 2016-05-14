
import { createSelector } from 'reselect';
import _ from 'lodash';

const AppActions = {
  fetchAppData() {
  }
}

var AppState = {
  spec: {},

  reducer(state = this.spec, action) {
    switch (action.type) {

    }
  },

  selector: createSelector(
    [
      
    ],
    (
      
    ) => {
      return {
        
      }
    }
  )
}
_.bindAll(AppState, _.functions(AppState));
_.bindAll(AppActions, _.functions(AppActions));

export {
  AppState,
  AppActions, 
}