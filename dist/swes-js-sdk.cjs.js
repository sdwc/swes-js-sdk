'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var track = function track(event, extraObj) {
  console.log(event);
  console.log(extraObj);
};
var init = function init(token) {
  console.log("Entrei no init");
  console.log(token);
};

exports.init = init;
exports.track = track;
