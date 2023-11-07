function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var _require = require('uuid'),
    uuidv1 = _require.v1;

var axios = require('axios');

var urlEventTrack = 'https://events.sdwc.me';
var urlRealIpAdressFind = 'https://api.ipify.org?format=json';
var ipAddress = getRealIp();

var TrackService = /*#__PURE__*/function () {
  function TrackService() {
    _classCallCheck(this, TrackService);
  }

  _createClass(TrackService, [{
    key: "sendPageHitTrack",
    value: function sendPageHitTrack(token) {
      var params = new URLSearchParams({
        event: 'page-hit',
        token: token,
        time: this.getCurTime(),
        ip: this.ipAddress,
        insert_id: uuidv1()
      });
      var url = "".concat(urlEventTrack, "?").concat(params.toString());
      console.log(url);
    }
  }, {
    key: "sendTrack",
    value: function sendTrack(token, event, objectId) {
      var params = new URLSearchParams({
        event: event,
        token: token,
        collection_id: objectId,
        time: this.getCurTime(),
        ip: ipAddress,
        insert_id: uuidv1()
      });
      var url = "".concat(urlEventTrack, "?").concat(params.toString());
      console.log(url);
    }
  }, {
    key: "getCurTime",
    value: function getCurTime() {
      return new Date().getTime();
    }
  }, {
    key: "sendFirstClickInterval",
    value: function sendFirstClickInterval(token, seconds) {
      var params = new URLSearchParams({
        event: 'first-click-interval',
        token: token,
        value: seconds,
        time: this.getCurTime(),
        ip: ipAddress,
        insert_id: uuidv1()
      });
      var url = "".concat(urlEventTrack, "?").concat(params.toString());
      console.log(url);
    }
  }, {
    key: "getRealIp",
    value: function getRealIp() {
      fetch(urlRealIpAdressFind).then(function (response) {
        return response.json();
      }).then(function (data) {
        ipAddress = data.ip;
        return data.ip;
      }).catch(function (error) {
        console.error(error);
      });
    }
  }]);

  return TrackService;
}();

var pageToken;
var trackFirstEventInterval = false;
var initTime = false;
var trackService = new TrackService();
var track = function track(event, objectId, extraObj) {
  if (trackFirstEventInterval) {
    trackFirstEventInterval = false;
    trackService.sendFirstClickInterval(pageToken, Math.ceil(Math.abs(initTime - new Date()) / 1000));
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

export { init, track };
