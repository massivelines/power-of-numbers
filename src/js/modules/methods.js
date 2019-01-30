// todo add debounce to sessionStorage

var REGEX_STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var REGEX_ARGUMENT_NAMES = /([^\s,]+)/g;

var SANITIZE = {
  '&': '',
  '<': '',
  '>': '',
  '"': '',
  "'": ''
};

define(function(require) {
  // gets formula arguments and returns them as an array
  function getArgs(func) {
    var funcString = func.toString().replace(REGEX_STRIP_COMMENTS, '');
    var argArray = funcString
      .slice(funcString.indexOf('(') + 1, funcString.indexOf(')'))
      .match(REGEX_ARGUMENT_NAMES);
    if (argArray === null) argArray = [];
    return argArray;
  }

  // gets any sessionStorage data
  function getSessionValues() {
    var storageArrKeys = Object.keys(sessionStorage);
    var data = {};

    for (key of storageArrKeys) {
      data[key] = sessionStorage[key];
    }
    return data;
  }

  function setSessionValues(key, value) {
    if(value != 0) {
      sessionStorage.setItem(key, value);
    } else {
      sessionStorage.removeItem(key);
    }
  }

  function sanitizeInput(data) {
    return data.replace(/[^0-9]/g, "");
  }

  return {
    getArgs: getArgs,
    getSessionValues: getSessionValues,
    setSessionValues: setSessionValues,
    sanitizeInput: sanitizeInput,
  };
});
