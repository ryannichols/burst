import _ from 'lodash';


/* ENTITY SELECTORS */
export const selectEntityByKey = (state, entity_key, key) => state.entities[entity_key][key];

/* LIST SELECTORS */
export const selectEntityList = (state, list_map, annotators) => {
  let entities = state.entities;
  if (list_map == undefined)
    return [];
  return _.compact(_.map(list_map.list, key => {
    let entity = entities[list_map.entity_type][key];
    return _.reduce(annotators, (entity, annotator) => {
        if(!entity) {
          console.warn(`Could not find entity id: ${key} in entities: ${list_map.entity_type} for list:`, list_map, entities[list_map.entity_type]);
          return null;
        }
        return annotator(state, entity);
    }, entity);
  }));
};


/*
 Computing entity lists creates new objects. This causes the memoized selectors to then update props and cause a render.
 We want to cache these computed entity lists, and return our previous results if the original list did not change
 so this doesn't happen.
*/
const _listEntityCache = {};
export const selectListEntitiesByKey = (state, list_key, key, annotators=[annotateOwner]) => {
  let listDict = _.get(state.lists, list_key);
  let list = key ? _.get(listDict, key) : listDict;
  let cacheKey = key ? key : "theone";
  let cachedList = _listEntityCache[list_key] ? _listEntityCache[list_key][cacheKey] : undefined;

  if(cachedList && cachedList[0] === list) {
    return cachedList[1].slice(); // only return copies
  }

  var entities = selectEntityList(state, list, annotators);
  if(!_listEntityCache[list_key])
    _listEntityCache[list_key] = {};
  _listEntityCache[list_key][cacheKey] = [list, entities];
  return entities.slice(); // only return copies
}
export const selectList = (state, type) => state.lists[type];

// EXAMPLE
// export const selectLiveStreams = (state) => state.entities.liveStreams;

/* PATH SELECTORS */
export const selectLocation = (state) => state.routing.locationBeforeTransitions;
export const selectPath = (state) => selectLocation(state).pathname;
export const selectQueryParam = (state, param) => selectLocation(state).query ? selectLocation(state).query[param] : null;




