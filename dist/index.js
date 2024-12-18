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
var cacheGeo = null;

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

      var referrer = null;

      try {
        if (window.frames.top.document.referrer) {
          referrer = new URL(window.frames.top.document.referrer).hostname;

          if (referrer) {
            var referrerParts = referrer.split('.');

            if (referrerParts.length > 2) {
              referrer = referrerParts[referrerParts.length - 2] + '.' + referrerParts[referrerParts.length - 1];
            }
          }
        }
      } catch (error) {
        console.error('err to get referrer:', error);
      }

      var params = new URLSearchParams({
        event: 'hit',
        object_type: 'page',
        token: token,
        referrer: referrer
      });
      axios({
        method: 'get',
        url: "".concat(this.urlEventTrack).concat(pathGeo)
      }).then(function (response) {
        cacheGeo = response.data;

        _this.enqueueRequestToTrackEvenUrl("".concat(_this.urlEventTrack, "?").concat(params.toString()));
      }).catch(function (error) {
        console.error('err to get geo:', error);

        _this.enqueueRequestToTrackEvenUrl("".concat(_this.urlEventTrack, "?").concat(params.toString()));
      });
    }
  }, {
    key: "sendTrack",
    value: function sendTrack(token, event, objectType, objectId) {
      var params = new URLSearchParams({
        event: event,
        token: token,
        object_type: objectType,
        object_id: objectId
      });
      this.enqueueRequestToTrackEvenUrl("".concat(this.urlEventTrack, "?").concat(params.toString()));
    }
  }, {
    key: "sendFirstClickInterval",
    value: function sendFirstClickInterval(token, seconds) {
      var params = new URLSearchParams({
        event: 'hit',
        token: token,
        object_type: 'first-click-interval',
        interval: seconds
      });
      this.enqueueRequestToTrackEvenUrl("".concat(this.urlEventTrack, "?").concat(params.toString()));
    }
  }, {
    key: "enqueueRequestToTrackEvenUrl",
    value: function enqueueRequestToTrackEvenUrl(url) {
      if (cacheGeo != null) {
        var params = new URLSearchParams({
          country: cacheGeo.countryCode,
          city: cacheGeo.city
        });
        url = "".concat(url, "&").concat(params.toString());
      }

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
var track = function track(event, objectType, objectId, extraObj) {
  if (trackFirstEventInterval) {
    trackFirstEventInterval = false;
    trackService.sendFirstClickInterval(pageToken, Math.ceil(Math.abs(initTime - new Date()) / 1000));
  }

  trackService.sendTrack(pageToken, event, objectType, objectId);
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
