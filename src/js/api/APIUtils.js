import _ from 'lodash';
import { URLUtils } from 'utils/Utils';
import crypto from 'crypto';

import { RequestState } from 'constants/AppConstants';
var { REQUEST, SUCCESS, FAIL } = RequestState;

export const REST_HOST = 'https://beta-api.sliver.tv';
export const REST_URI = '/v1';
export const REST_PREFIX = REST_HOST+REST_URI;
export const S3_BUCKET_URL = "";
export const S3_BUCKET_UPLOAD_URL = "";



function _fetch(url, params, method, dispatch, action, body) {
  if(dispatch && action) {
      dispatch(request(action, url, params));  
  }
  return fetch(restUrl(url, params), fetchInit(method, body))
    .then(response => response.json())
    .then(json => {
      if(!json) {
        let err = "Invalid JSON response";
        if(dispatch && action) {
          dispatch(error(action, {error:err}, url, params));
        } 
        return Promise.reject(err);
      } else if(json.error) {
        if(dispatch && action) {
          dispatch(error(action, _.pick(json, ['error', 'error_code', 'error_fields']),  url, params));
        }
        return Promise.reject(json.error);
      } 
      if(dispatch && action) {
        dispatch(receive(action, json, url, params));
      }
      return json;
    })
    .catch(err => {
      console.log("ERROR IN FETCH RESPONSE: ", err);
    });
}
export function get(url, params, dispatch, action) {
  return _fetch(url, params, 'get', dispatch, action);
}
export function post(url, params, dispatch, action, body) {
  return _fetch(url, params, 'post', dispatch, action, body);
};

export function request(action, url, params) {
    return {
      type: action,
      url,
      params,
      result: REQUEST,
      fetchAt: Date.now(),
    };
}

export function receive(action, json, url, params) {
  return {
    type: action,
    json,
    url,
    params,
    result: SUCCESS,
    receivedAt: Date.now()
  }
}

export function error(action, error, url, params) {
  return {
    type: action,
    ...error,
    url,
    params,
    result: FAIL,
    receivedAt: Date.now()
  }
}

export function fetchInit(method = 'get', body) {
  var formData = null
  if (body) {
    // method must be post to send body
    method = 'post'
    formData = new FormData();
    // output body in extended query string format
    // {a: 1, b: [2, 3], c: {a: 4, b: 5}} => a=1&b[0]=2&b[1]=3&c[a]=4&c[b]=5
    // {a: 1, d: [{a: 2, b: 3}, {a: 4, b: 5}]} => a=1&d[0][a]=2&d[0][b]=3&d[1][a]=4&d[1][b]=5
    function appendFormData(rootKey, obj) {
      if (_.isArray(obj)) {
        _.forEach(obj, (value, ndx) => {
          appendFormData(rootKey + '[' + ndx + ']', value);
        });
      } else if (_.isObject(obj)) {
        _.forOwn(obj, (value, key) => {
          appendFormData(rootKey + '[' + key + ']', value);
        });
      } else {
        formData.append(rootKey, obj);
      }
    }
    _.forOwn(body, (value, key) => {
      appendFormData(key, value);
    });
    return {
      method,
      credentials: 'include',
      body: formData
    }
  }
  return {
    method,
    mode: 'cors',
  }

}
export function restUrl(url, params, urlMap) {
  return URLUtils.mergeUrl(REST_PREFIX + url, params, urlMap);
}



/*
* S3 Utils
*/

export function _createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

export function putS3(url, mimetype, file) {
  return new Promise((resolve, reject) => {
    var xhr = _createCORSRequest('PUT', url);
    xhr.setRequestHeader('Content-Type', mimetype);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.setRequestHeader('X-Requested-With', '');
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr);
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        reject(xhr);
      }
    }
    xhr.send(file);
  });
}

export function getS3Url() {
  return S3_BUCKET_URL;
}
export function getS3UploadUrl() {
  return S3_BUCKET_UPLOAD_URL;
}
