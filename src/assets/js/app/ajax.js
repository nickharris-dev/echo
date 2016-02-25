import merge from './merge';

// Ajax Requests
// =============
// 1st argument: url to fetch, 2nd argument: optional prefs object, 3rd argument: callback
export default function (arg1, arg2, arg3) {
  'use strict';

  // Declare Variables
  var self = this;
  var xhr = new XMLHttpRequest();
  var responseText, prefs, callback, url;

  // Detect arguments
  if (arguments.length < 2) {
    throw new Error ('Ajax error, you must provide a url and a callback');
  } else if (arguments.length == 2) {
    url = arguments[0];
    callback = arguments[1];
    prefs = {};
  } else {
    url = arguments[0];
    prefs = arguments[1];
    callback = arguments[arguments.length-1];
  }

  // Define Defaults
  // ---------------
  var defaults = {
    method : 'GET',
    type : 'xml'
  };

  // Create options object
  var options = merge(defaults, prefs);

  function stateChange () {
    if (xhr.readyState !== 4) {
      return;
    }
    else if (xhr.status !== 200 && xhr.status !== 304) {
      throw new Error('HTTP error ' + xhr.status);
    }
    callback(xhr);
  }

  xhr.onreadystatechange = stateChange;
  if (options.method === 'GET') {
    xhr.open(options.method, url, true); // true is for asyncronous
    xhr.responseType = 'document';
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(null);
  } else {
    throw new Error ('Sorry, only GET supported at the moment');
  }
};
