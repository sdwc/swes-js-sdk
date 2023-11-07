(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['swes-js-sdk'] = {}));
}(this, (function (exports) { 'use strict';

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

    Object.defineProperty(exports, '__esModule', { value: true });

})));
