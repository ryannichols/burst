import _ from 'lodash';
import { URLUtils } from 'utils/Utils';
import crypto from 'crypto';

import { 
  RequestState,
  Hosts,
  DEFAULT_ENV } from 'constants/AppConstants';
var { 
  REQUEST, 
  SUCCESS, 
  FAIL } = RequestState;

export const S3_BUCKET_URL = "";
export const S3_BUCKET_UPLOAD_URL = "";



function _fetch(opt, params, method, dispatch, action, body, headers, host) {
  var url = opt;
  if(_.isObject(opt)) {
    url = opt.url;
    params = opt.params ? opt.params : params; 
    method = opt.method ? opt.method : method;
    dispatch = opt.dispatch;
    action = opt.action;
    body = opt.body;
    headers = opt.headers;
    host = opt.host ? opt.host : host;
  } 
  if(dispatch && action) {
      dispatch(request(action, url, params, body));  
  }
  return fetch(restUrl(url, params, host), fetchInit(method, body, headers))
    .then(response => response.json())
    .then(json => {
      if(!json) {
        let err = "Invalid JSON response";
        if(dispatch && action) {
          dispatch(error(action, {error:err}, url, params));
        } 
        return Promise.reject({errorMessage:err});
      } else if(json.errorCode || _.get(json, 'body.error_code') || json.status === "ERROR") {
        if(dispatch && action) {
          dispatch(error(action, _.pick(json, ['errorCode', 'errorMessage']), url, params));
        }
        return Promise.reject({
          errorMessage: json.errors || json.errorMessage,
          errorCode: json.errorCode
        });
      } else if(json.code && json.code != 200) {
        if(dispatch && action) {
          dispatch(error(action, _.pick(json, ['code', 'message']),  url, params));
        }
        return Promise.reject({
          errorMessage: `code ${json.code}: ${json.message}`
        });
      }
      if(dispatch && action) {
        dispatch(receive(action, json, url, params));
      }
      json.headers = headers;
      return json;
    })
    //.catch(err => {
    //  console.log("ERROR IN FETCH RESPONSE: ", err);
    //  return Promise.reject(err);
    //});
}
export function get(url, params, dispatch, action, body, headers, host = Hosts[DEFAULT_ENV].PUBLIC) {
  return _fetch(url, params, 'get', dispatch, action, body, headers, host);
}
export function post(url, params, dispatch, action, body, headers, host = Hosts[DEFAULT_ENV].PUBLIC) {
  return _fetch(url, params, 'post', dispatch, action, body, headers, host);
};
export function put(url, params, dispatch, action, body, headers, host = Hosts[DEFAULT_ENV].PUBLIC) {
  return _fetch(url, params, 'put', dispatch, action, body, headers, host);
};
export function del(url, params, dispatch, action, body, headers, host = Hosts[DEFAULT_ENV].PUBLIC) {
  return _fetch(url, params, 'delete', dispatch, action, body, headers, host);
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

export function fetchInit(method = 'get', body, headers = {}) {
  headers = _.assign(headers, {
    'Content-Type': 'application/json',
  });
  let init = {
    method,
    headers,
    mode: 'cors',
  };
  init = body ? _.assign(init, {body: JSON.stringify(body)}) : init;
  return init;
}
export function restUrl(url, params, host) {
  if(url.indexOf("http") !== -1) {
    return URLUtils.mergeUrl(url, params, urlMap);
  }
  return URLUtils.mergeUrl(host + url, params);
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
