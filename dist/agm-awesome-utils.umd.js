(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['swes-js-sdk'] = {}));
}(this, (function (exports) { 'use strict';

    var pageToken;
    var track = function track(event, objectId, extraObj) {
      console.log(event);
      console.log(objectId);
      console.log(extraObj);
      console.log(pageToken);
    };
    var init = function init(token, extraObj) {
      pageToken = token;
      console.log("Entrei no init");
      console.log(token);
      console.log(extraObj);
    };

    exports.init = init;
    exports.track = track;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
