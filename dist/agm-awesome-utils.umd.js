(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['swes-js-sdk'] = {}));
}(this, (function (exports) { 'use strict';

  var pageToken;
  var trackFirstEventInterval = false;
  var initTime = false;
  var urlEventTrack = 'https://events.sdwc.me';
  var ipAddress = getRealIp();
  var track = function track(event, objectId, extraObj) {
    if (trackFirstEventInterval) {
      trackFirstEventInterval = false;
      sendFirstClickInterval(pageToken, Math.ceil(Math.abs(initTime - new Date()) / 1000));
    }

    sendTrack(pageToken, event, objectId);
  };
  var init = function init(token, extraObj) {
    pageToken = token;

    if (extraObj != null) {
      extraObj.track_pageview != undefined ? extraObj.track_pageview : false;
      trackFirstEventInterval = extraObj.track_firsteventinterval != undefined ? extraObj.track_firsteventinterval : false;

      if (trackFirstEventInterval) {
        initTime = new Date();
      }
    }

    sendPageHitTrack(token);
  };

  function sendFirstClickInterval(token, seconds) {
    var params = new URLSearchParams({
      event: 'first-click-interval',
      token: token,
      value: seconds,
      time: getCurTime(),
      ip: ipAddress
    });
    var url = "".concat(urlEventTrack, "?").concat(params.toString());
    console.log(url);
  }

  function sendTrack(token, event, objectId) {
    var params = new URLSearchParams({
      event: event,
      token: token,
      collection_id: objectId,
      time: getCurTime(),
      ip: ipAddress
    });
    var url = "".concat(urlEventTrack, "?").concat(params.toString());
    console.log(url);
  }

  function sendPageHitTrack(token) {
    var params = new URLSearchParams({
      event: 'page-hit',
      token: token,
      time: getCurTime(),
      ip: ipAddress
    });
    var url = "".concat(urlEventTrack, "?").concat(params.toString());
    console.log(url);
  }

  function getCurTime() {
    return new Date().getTime();
  }

  function getRealIp() {
    fetch('https://api.ipify.org?format=json').then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log('Endereço IP público do cliente:', data.ip);
      ipAddress = data.ip;
      return data.ip;
    }).catch(function (error) {
      console.error('Erro ao obter o endereço IP público:', error);
    });
  }

  exports.init = init;
  exports.track = track;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
