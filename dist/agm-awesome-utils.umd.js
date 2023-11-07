(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['swes-js-sdk'] = {}));
}(this, (function (exports) { 'use strict';

    var pageToken;
    var trackFirstEventInterval = false;
    var initTime = false;
    var track = function track(event, objectId, extraObj) {
      console.log(event);
      console.log(objectId);
      console.log(extraObj);
      console.log(pageToken);
      console.log(trackFirstEventInterval);

      if (trackFirstEventInterval) {
        var diffTime = Math.abs(initTime - new Date());
        var diffSeconds = Math.ceil(diffTime / 1000);
        console.log(diffSeconds);
        trackFirstEventInterval = false;
      }
    };
    var init = function init(token, extraObj) {
      pageToken = token;
      console.log(extraObj);

      if (extraObj != null) {
        extraObj.track_pageview != undefined ? extraObj.track_pageview : false;
        trackFirstEventInterval = extraObj.track_firsteventinterval != undefined ? extraObj.track_firsteventinterval : false;
        console.log(trackFirstEventInterval);
      }

      afterInit();
    };

    function afterInit() {
      console.log("afterInit");

      if (trackFirstEventInterval) {
        initTime = new Date();
        console.log(initTime);
      }
    }

    exports.init = init;
    exports.track = track;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
