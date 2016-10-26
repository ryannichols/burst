import _ from 'lodash';
import moment from 'moment';
import crypto from 'crypto';

import StoreUtils from 'utils/StoreUtils';

import {
     ImageResizer,
     URL,
     MediaType,
     FileType, } from 'constants/AppConstants';



const MediaUtils = {

    // CSS & Styles
  backgroundImage(url) {
    if(!url) return {};
    return {backgroundImage:"url('" + url + "')"};
  },

  // Image & Media
  isImageFile(type) {
    return type.indexOf("image/") !== -1;
  },
  isVideoFile(type) {
    return type.indexOf("video/") !== -1;
  },
  isAudioFile(type) {
    return type.indexOf("audio/") !== -1;
  },
  getFileType(type) {
    if(this.isImageFile(type)) {
      return FileType.IMAGE
    } else if(this.isVideoFile(type)) {
      return FileType.VIDEO;
    } else if(this.isVideoFile(type)) {
      return FileType.AUDIO;
    }
    return undefined;
  },
  getTypeFromFile(file) {
    return this.getFileType(file.type);
  },
  getFileFromBlob(blob) {

  },
  isPortrait(img){
    var w = img.naturalWidth || img.width,
        h = img.naturalHeight || img.height;
    return (h > w);
  },
  resizeImageUrl(imageUrl,w,h,params={q:60}) {
    var resized = false;
    var fileExtentionType = 'jpg'
    if (!imageUrl)
      return imageUrl;
    if (imageUrl.indexOf(ImageResizer.thumbOrigBucket) >= 0) {
        imageUrl = imageUrl.replace(ImageResizer.thumbOrigBucket,ImageResizer.thumbResizedBucket)
        resized = true;
    } else if (imageUrl.indexOf(ImageResizer.profileOrigBucket) >= 0) {
        imageUrl = imageUrl.replace(ImageResizer.profileOrigBucket,ImageResizer.profileResizedBucket)
        resized = true;
    }
    if (resized) {
      if(imageUrl.slice(-4) === '.gif') {
        fileExtentionType = 'gif'
      }
      params = _.assign({
        w,
        h,
        fm: fileExtentionType,
        // Makes images too large.
        // ch: 'DPR',
        // dpr: 2,
        fit: 'max'
      }, params);
      imageUrl = imageUrl + "?" + URLUtils.paramsToString(params);
    }
    return imageUrl;
  },
  loadImageElement(url) {
    return new Promise((resolve, reject) => {
      var imageObj = document.createElement('img');
      if (url.substr(0, 4) === 'http') {
        // Workaround for Firefox with data URLs
        imageObj.crossOrigin = 'anonymous';
      }
      imageObj.src = url;
      if (this.checkIfImageLoaded(imageObj)) {
        _.defer(() => resolve(imageObj));
      } else {
        imageObj.onload = () => {
          imageObj.onload = null;
          imageObj.onerror = null;
          // Check if a valid image was loaded, to avoid "The HTMLImageElement provided is in the 'broken' state."
          if (this.checkIfImageLoaded(imageObj)) resolve(imageObj);
          else reject(new Error('Failed to load image with size > 0.'));
        };
        imageObj.onerror = (err) => {
          imageObj.onload = null;
          imageObj.onerror = null;
          reject(err);
        }
      }
    });
  },
  loadVideoElement(url) {
    return new Promise((resolve, reject) => {
      var videoObj = document.createElement('video');
      if (url.substr(0, 4) === 'http') {
        // Workaround for Firefox with data URLs
        videoObj.crossOrigin = 'anonymous';
      }
      videoObj.oncanplay = () => {
        videoObj.oncanplay = null;
        videoObj.onerror = null;
        resolve(videoObj);
      };
      videoObj.onerror = (err) => {
        console.warn(err.target.error);
        reject(err);
      };
      videoObj.src = url;
    });
  },
  // complete + naturalWidth check from http://stackoverflow.com/a/1977898
  checkIfImageLoaded(img) {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if (!img.complete) {
        return false;
    }

    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.

    if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
        return false;
    }

    // No other way of checking: assume it’s ok.
    return true;
  },
  captureVideoFrameAsURL(video, scaleFactor) {
    if(scaleFactor == null){
        scaleFactor = 1;
    }
    var w = video.videoWidth * scaleFactor;
    var h = video.videoHeight * scaleFactor;
    var canvas = document.createElement('canvas');
        canvas.width  = w;
        canvas.height = h;
    var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);
    return canvas.toDataURL('image/png');
  },
  dataURLToBlob: function(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  },
  blobToFile(blob, fileName) {
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob;
  },
};





const GeoUtils = {
  // Geometry
  centerRectInRect(src, dst) {
    return {
      top: (dst.height / 2) - (src.height / 2),
      left: (dst.width / 2) - (src.width / 2),
      right: 0,
      bottom: 0,
      width: src.width,
      height: src.height,
    }
  },
  constrainRectInRect(dst, src, scale = false) {
    src = _.pick(src, ['width','height']);
    if(!scale && src.width/dst.width <= 1 && src.height/dst.height <= 1) {
      return this.centerRectInRect(src, dst);
    }
    var scale = Math.min(dst.width/src.width, dst.height/src.height);
    src.width *= scale;
    src.height *= scale;
    return this.centerRectInRect(src, dst);
  },
  applyRectToElement(elm, rect) {
    elm.style.top = rect.top ? rect.top : undefined;
    elm.style.left = rect.left ? rect.left : undefined;
    elm.style.width = rect.width ? rect.width : undefined;
    elm.style.height = rect.height ? rect.height : undefined;
    return elm;
  },
  videoRectForParent(streamSize, parentRect) {
    var { width:pw, height:ph } = parentRect;
    var { width:sw, height:sh } = streamSize;

    // Only constrain portait ratio's, don't scale (typically mobile)
    if(sh >= sw){

      // make the mobile stream fit the parents height
      if(sh < ph){
        var difference = ph - sh;
        streamSize.height += difference;
        streamSize.width += difference;
      }
      // TODO test this to see if it gives 10% crop on top and bottom
      // streamSize.height *= 0.2;
      // streamSize.width *= 0.2;
      return this.constrainRectInRect(parentRect, streamSize);
    }

    // Covnert stream size to 16:9 ratio, preferring width
    sh = Math.round(sw / 1.777);

    // Scale to fill
    // get scale by the 16:9 size, not actual
    var scale;
    if(pw/sw <= ph/sh) {
      scale = pw/sw;
    } else {
      scale = ph/sh;
    }

    return this.centerRectInRect({
      width: streamSize.width * scale,
      height: streamSize.height * scale,
    }, parentRect);
  },
};





const URLUtils = {
  // URL & Parameters
  getParam(sParam, url) {
    var sPageURL = url ? url : window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
          return sParameterName[1];
      }
    }
  },
  getQueryParams(url) {
    if(!url || url.indexOf('?') == -1)
      return undefined;
    var queries = url ? url.split('?')[1] : window.location.search;
    queries = queries.replace(/(^\?)/,'').split("&").map(function(n) {return n = n.split("="),this[n[0]] = decodeURIComponent(n[1]),this}.bind({}))[0];
    return queries;
  },
  getPathWithoutQuery(url) {
    var pathOnly = url ? url.split('?')[0] : window.location.search;
    return pathOnly;
  },
  paramsToString(obj) {
    var parts = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i) && !_.isNil(obj[i])) {
          parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
      }
    }
    return parts.join("&");
  },
  path(path, params) {
    return this.mergeUrl(path, params);
  },
  mergeUrl(url, params, urlMap) {
    if(!url) {
      console.error("URL is not defined for action: ", params);
    }
    if(!params)
      return url;
    params = _.merge({}, params);
    if(urlMap) {
      _.keys(urlMap).forEach((k) => {
        params[urlMap[k]] = params[k];
        delete params[k];
      });
    }
    if(url.indexOf(":") !== -1) {
      url.match(/:([0-9_a-z]+)/gi).forEach((match)=>{
        var key = match.replace(":", "");
        url = url.replace(match, params[key]);
        params = _.omit(params, key);
      });
    }
    if(_.keys(params).length > 0) {
      url = url + "?" + this.paramsToString(params);
    }
    return url;
  },
  pathBefore(path, segment) {
    if(!path) return undefined;
    if(!segment) return path;
    return path.split(segment)[0];
  }
};


const Utils = {
	getCookie(name) {
	    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
	    return r ? r[1] : undefined;
	},
  getToken() {
    return crypto.randomBytes(4).toString('hex');
  },
  sanitizeText(text) {
    return text;
  },


  /**
  * Return a function that calls each function in the given array with
  * no arguments. Useful for batch unsubscription with Bacon.
  *
  * @param {Function[]} An Array of functions to call
  * @return {Function}
  */
  unsubscriber(arr) {
    return function () {
      if (arr !== null) {
        arr.forEach(f => f());
        arr = null;
      }
    };
  },
  hashCode(string) {
    var hash = 0, i, chr, len;
    if (string.length == 0) return hash;
    for (i = 0, len = string.length; i < len; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  },
  formatDuration(secs, shortHours = false) {
    var secs = Math.floor(secs);
    var ss = secs % 60;
    var mm = Math.floor(secs / 60) % 60;
    var hh = Math.floor(secs / 3600);
    var r = '';
    if (hh > 0) {
      if(shortHours) {
        r += hh.toString()+'h ';
      } else {
        r += _.padStart(hh.toString(), 2, '0');
      }
    }
    r += _.padStart(mm.toString(), 2, '0');
    r += _.padStart(ss.toString(), 2, '0');
    return r;
  },
  formatShortFromNow(time) {
    var now = moment().unix();
    var seconds = now - time.unix();
    if(seconds < 0 ) return 0;

    if(seconds < 60) {
      return seconds + "s";
    } else if(seconds > 60 && seconds <= 60*60) {
      return Math.round(seconds / 60) + "m";
    } else if (seconds > 60*60 && seconds <= 60*60*24) {
      return Math.round(seconds / 60 / 60) + "h";
    } else {
      return Math.round(seconds / 60 / 60 / 24) + "d";
    }
  },
  formatTimeFromNow(time){
    return moment(time).isSame(moment(), 'day')
      ? moment(time).format("h:mmA")
      : moment(time).fromNow();
  },
  // Returns false if we didn't set the local sessionStorage.geo_access to "granted"
  // Returns true if user did grant access
  // Still returns true if user granted and then later revoked access :(
  hasAllowedGeoLocate() {
    return sessionStorage.getItem("geo_access") == "granted";
  },
  getGeolocatePermissionLevel() {
    return sessionStorage.getItem("geo_access") == "granted"
      ? "GRANTED"
      : sessionStorage.getItem("geo_access") == "denied"
        ? "DENIED"
        : "PENDING";
  },
  // Accepts two callbacks:
  // - cbSuccess: Returns pos object on success
  // - cbFail: Returns error object on failure
  // Also sets the local storage.geoAccess with the permissions request response
  askForGeolocation(cbSuccess, cbFail) {
    var self = this;
    if( sessionStorage.getItem("geo_access") === null ){
      sessionStorage.setItem("geo_access", "prompt");
    }
    navigator.geolocation.getCurrentPosition(function(pos){
      sessionStorage.setItem("geo_access", "granted");
      self.createLocationObject(pos, cbSuccess, cbFail);
    }, function(err){
      if(err.code == 1){ // PERMISSION_DENIED
        sessionStorage.setItem("geo_access", "denied");
      } else {
        sessionStorage.setItem("geo_access", "prompt");
      }
      cbFail(err);
    });
    return sessionStorage.getItem("geo_access") == "granted";
  },

  isMobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  },
};

_.bindAll(StoreUtils, _.functions(StoreUtils));
_.bindAll(MediaUtils, _.functions(MediaUtils));
_.bindAll(GeoUtils, _.functions(GeoUtils));
_.bindAll(URLUtils, _.functions(URLUtils));
_.bindAll(Utils, _.functions(Utils));

export {
  StoreUtils,
  MediaUtils,
  GeoUtils,
  URLUtils,
  Utils,
};
