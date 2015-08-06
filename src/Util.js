/**
 * wrapper for utility service to be exposed
 * @type {Object}
 */
var service = {};

/**
 * checks if an object is valid JSON
 * @param obj {*} object to check
 * @return {Boolean}
 */
service.isJSON = function(obj) {
  try {
    JSON.parse(obj);
  } catch (e) {
    return false;
  }

  return true;
};

/**
 * checks if an object is a function
 * @param obj {*} object to check
 * @return {Boolean}
 */
service.isFunction = function(fn) {
  return typeof fn === 'function';
};

/**
 * Javascript prototypical inheritance
 * @param  {Function} ctor
 * @param  {Function} superCtor
 * @return {Function}
 */
service.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  for (var key in superCtor) {
    if (superCtor.hasOwnProperty(key)) {
      ctor[key] = superCtor[key];
    }
  }
};

/**
 * extends object a with object b's functions and values
 * @param a {Object} target object
 * @param b {Object} reference object
 */
service.extend = function(a, b) {
  if (!b) return a;
  if (!a) return b;

  var keys = Object.keys(b);
  for (var j = 0, jj = keys.length; j < jj; j++) {
    var key = keys[j];
    a[key] = b[key];
  }

  return a;
};

/**
 * similar to `extend` but w/ recursion on objects to preserve missing targets
 * @param a {Object} target object
 * @param b {Object} reference object
 */
service.deepExtend = function(a, b) {
  if (!b) return a;
  if (!a) return b;
};

/**
 * checks if a string is a valid email
 * @param input {String} string to check
 * @returns {Boolean} whether or not the email is valid
 */
service.isValidEmail = function(input) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(input);
};

/**
 * Generate RFC-compliant uuid
 * @return {string}
 */
service.uuid = function() {
  var d;
  d = Date.now();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function(c) {
      var r;
      r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : r & 0x7 | 0x8).toString(16);
    });
};

/**
 * generate random string
 * @param length {Number} desired length of string
 * @param useAlphabet {Boolean} whether to use alphabet characters, defaults to true
 * @param useNumbers {Boolean} whether to use numeric characters, defaults to true
 * @returns {String}
 */
service.random = function(length, useAlphabet, useNumbers) {
  var
    token = '',
    list = '';

  useAlphabet = typeof useAlphabet === 'undefined' ? true : (useAlphabet ? true : false);
  useNumbers = typeof useNumbers === 'undefined' ? true : (useNumbers ? true : false);

  list += useAlphabet ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : '';
  list += useNumbers ? '0123456789' : '';

  while (token.length < length) {
    token += list.charAt(Math.floor(Math.random() * list.length));
  }

  return token;
};

/**
 * Find index of item in array
 * @param  {*} needle Item to find.
 * @param  {Array} haystack Array to search.
 * @return {integer}
 */
service.indexOf = function(needle, haystack) {
  for (var i = 0, len = haystack.length; i < len; i++) {
    if (haystack[i] === needle) {
      return i;
    }
  }
  return -1;
};

/**
 * string helpers for base64 encoding /d ecoding
 * @type {string}
 * @private
 */
service._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * base64 encodes a string
 * @param input
 * @returns {string}
 */
service.encodeBase64 = function(input) {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  input = service.encodeUTF8(input);

  while (i < input.length) {

    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      service._keyStr.charAt(enc1) + service._keyStr.charAt(enc2) +
      service._keyStr.charAt(enc3) + service._keyStr.charAt(enc4);
  }

  return output;
};

/**
 * encodes a string into utf8
 * @param string
 * @returns {string}
 */
service.encodeUTF8 = function(string) {
  string = string.replace(/\r\n/g, "\n");
  var utftext = "";

  for (var n = 0; n < string.length; n++) {

    var c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    }
    else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    }
    else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }

  return utftext;
};

/**
 * takes data url and returns Blob object
 * @param {object} dataURI
 * @returns {Object} instance of Blob
 */
service.dataURItoBlob = function(dataURI) {
  'use strict'
  var byteString,
    mimestring

  if (dataURI.split(',')[0].indexOf('base64') !== -1) {
    byteString = atob(dataURI.split(',')[1])
  } else {
    byteString = decodeURI(dataURI.split(',')[1])
  }

  mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

  var content = new Array();
  for (var i = 0; i < byteString.length; i++) {
    content[i] = byteString.charCodeAt(i)
  }

  return new Blob([new Uint8Array(content)], { type: mimestring });
};

/**
 * removes HTML tags from a string
 * @param text {String} text to clean
 */
service.stripTags = function(text) {
  return $filter('stripTags')(text);
};

/**
 * removes non-alphanumeric characters from a string
 * @param text {String} text to clean
 * @returns {*}
 */
service.stripNonAlphanumeric = function(text) {
  return $filter('stripNonAlphanumeric')(text);
};

/**
 * wraps async function to make sure it doesn't run too long
 * @param promise {Object} promise to watch
 * @param max {Number} max time in milliseconds
 * @returns {promise|*|Q.promise}
 */
service.countdown = function(promise, max) {
  var
    deferred = $q.defer(),
    count = 0,
    id = setInterval(function() {
      count += 1000;

      if (count >= max) {
        clear();
        deferred.reject('Timed out.');
      }
    }, 1000),
    clear = function() {
      clearTimeout(id);
    };

  promise.then(function(val) {
    clear();
    deferred.resolve(val);
  }).catch(function(err) {
    clear();
    deferred.reject(err);
  });

  return deferred.promise;
};

/**
 * extracts a value from an object, function, or async function
 * @param val {Object|Function}
 * @param timeout {Number} max time to run an async function
 * @param args {Array} arguments to call function with (if function)
 */
service.safeAsync = function(val, timeout, args) {
  var deferred = $q.defer();

  /**
   * waits for a promise, resolves deferred when resolved
   * @param promise
   */
  function evalPromise(promise) {
    // wrap in `countdown`
    service.countdown(promise, timeout)
      .then(function(resolvedValue) {
        deferred.resolve(resolvedValue);
      }).catch(function(err) {
        deferred.reject(err);
      });
  }

  if (val && val.then) {
    // if promise passed
    evalPromise(val);
  } else if (typeof val === 'function') {
    // if function passed
    val = val.apply(this, arguments);

    if (val && val.then) {
      // if function returned promise
      evalPromise(val);
    } else {
      deferred.resolve(val);
    }
  } else {
    // regular object / value passed, resolve
    deferred.resolve(val);
  }

  return deferred.promise;
};

/**
 * gets the names of the arguments sent to a function
 * @param func {Function} the function to check
 * @returns {string[]}
 */
service.getParamNames = function(func) {
  var
    STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
    ARGUMENT_NAMES = /([^\s,]+)/g,
    fnStr = func.toString().replace(STRIP_COMMENTS, ''),
    result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

  if (result === null) {
    result = [];
  }

  return result;
};

/**
 * transforms a string, replaces all instances of strings with their mapping
 * @param str {String} string to transform
 * @param map {Object} key / value mapping of strings to replace
 * @returns {String}
 */
service.mapStrings = function(str, map) {
  var
    isDirty = true,
    ref;

  while (isDirty) {
    isDirty = false;
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        ref = str.replace(key, map[key]);
        if (str !== ref) {
          str = ref;
          isDirty = true;
        }
      }
    }
  }

  return str;
};