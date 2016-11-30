
export function getChangedProps(next, prev, keys) {
  return _.reduce(keys, (s, key) => hasPropChanged(next, prev, key) ? _.set(s, key, next[key]) : s, {});
}

export function hasPropChanged(prev, next, path) {
  if(!_.has(prev, path) && !_.has(next, path)) return false;
  return Boolean(_.get(prev, path) !== _.get(next, path));
}

export function hasPropChangedTo(prev, next, path) {
  if(!_.has(next, path)) return false;
  return Boolean(_.get(prev, path) !== _.get(next, path));
}

export function hasPropBeenDefined(prev, next, path) {
  return Boolean(_.isNil(_.get(prev, path)) && !_.isNil(_.get(next, path)));
}