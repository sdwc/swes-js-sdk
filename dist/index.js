import axios from 'axios';

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

var requestQueue = [];
var pathGeo = '/geo';

var TrackService = /*#__PURE__*/function () {
  function TrackService(urlEventTrack) {
    _classCallCheck(this, TrackService);

    this.urlEventTrack = urlEventTrack;
    processQueue();
  }

  _createClass(TrackService, [{
    key: "sendPageHitTrack",
    value: function sendPageHitTrack(token) {
      var _this = this;

      var params = new URLSearchParams({
        event: 'page-hit',
        token: token
      });
      axios({
        method: 'get',
        url: "".concat(this.urlEventTrack).concat(pathGeo)
      }).then(function (response) {
        console.log('Resposta da solicitação:', response.data);
        console.log(response.data.countryCode);
        console.log(response.data.city);

        _this.enqueueRequestToTrackEvenUrl("".concat(_this.urlEventTrack, "?").concat(params.toString()));
      }).catch(function (error) {
        console.error('err to get geo:', error);

        _this.enqueueRequestToTrackEvenUrl("".concat(_this.urlEventTrack, "?").concat(params.toString()));
      });
    }
  }, {
    key: "sendTrack",
    value: function sendTrack(token, event, objectId) {
      var params = new URLSearchParams({
        event: event,
        token: token,
        object_id: objectId
      });
      this.enqueueRequestToTrackEvenUrl("".concat(this.urlEventTrack, "?").concat(params.toString()));
    }
  }, {
    key: "sendFirstClickInterval",
    value: function sendFirstClickInterval(token, seconds) {
      var params = new URLSearchParams({
        event: 'first-click-interval',
        token: token,
        interval: seconds
      });
      this.enqueueRequestToTrackEvenUrl("".concat(this.urlEventTrack, "?").concat(params.toString()));
    }
  }, {
    key: "enqueueRequestToTrackEvenUrl",
    value: function enqueueRequestToTrackEvenUrl(url) {
      requestQueue.push({
        method: 'get',
        url: url
      });
    }
  }]);

  return TrackService;
}();

function processQueue() {
  if (requestQueue.length === 0) {
    setTimeout(processQueue, 1000);
    return;
  }

  var config = requestQueue.shift(); // get the next

  axios(config).then(function (response) {
    processQueue();
  }).catch(function (error) {
    console.error('err to call url:', error);
    processQueue();
  });
}

var pageToken;
var trackFirstEventInterval = false;
var initTime = false;
var trackService = null;
var track = function track(event, objectId, extraObj) {
  if (trackFirstEventInterval) {
    trackFirstEventInterval = false;
    trackService.sendFirstClickInterval(pageToken, Math.ceil(Math.abs(initTime - new Date()) / 1000));
  }

  trackService.sendTrack(pageToken, event, objectId);
};
var init = function init(token, extraObj, urlEventTrack) {
  trackService = new TrackService(urlEventTrack);
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
