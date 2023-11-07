var _require = require('uuid'),
    uuidv1 = _require.v1;

var axios = require('axios');

var pageToken;
var trackFirstEventInterval = false;
var initTime = false;
var urlEventTrack = 'https://events.sdwc.me';
var urlRealIpAdressFind = 'https://api.ipify.org?format=json';
var ipAddress = getRealIp();
var trackService = new TrackService();
var track = function track(event, objectId, extraObj) {
  if (trackFirstEventInterval) {
    trackFirstEventInterval = false;
    sendFirstClickInterval(pageToken, Math.ceil(Math.abs(initTime - new Date()) / 1000));
  }

  trackService.sendTrack(pageToken, event, objectId);
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

  trackService.sendPageHitTrack(token);
};

function sendFirstClickInterval(token, seconds) {
  var params = new URLSearchParams({
    event: 'first-click-interval',
    token: token,
    value: seconds,
    time: getCurTime(),
    ip: ipAddress,
    insert_id: uuidv1()
  });
  var url = "".concat(urlEventTrack, "?").concat(params.toString());
  console.log(url);
}

function getCurTime() {
  return new Date().getTime();
}

function getRealIp() {
  fetch(urlRealIpAdressFind).then(function (response) {
    return response.json();
  }).then(function (data) {
    ipAddress = data.ip;
    return data.ip;
  }).catch(function (error) {
    console.error(error);
  });
}

export { init, track };
