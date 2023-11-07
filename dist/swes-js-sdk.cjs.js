'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var urlEventTrack = 'https://events.sdwc.me';
var track = function track(event, objectId, extraObj) {
  console.log(event);
  console.log(objectId);
  console.log(extraObj);
};
var init = function init(token, extraObj) {

  if (extraObj != null) {
    extraObj.track_pageview != undefined ? extraObj.track_pageview : false;
    extraObj.track_firsteventinterval != undefined ? extraObj.track_firsteventinterval : false;
  }

  sendPageHitTrack(token);
};

function sendPageHitTrack(token) {
  var params = new URLSearchParams({
    event: 'page-hit',
    token: token
  });
  var url = "".concat(urlEventTrack, "?").concat(params.toString());
  console.log(url);
}

exports.init = init;
exports.track = track;
