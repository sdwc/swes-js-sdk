function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

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

var urlRealIpAdressFind = 'https://api.ipify.org?format=json';
var ipAddress = null;
var requestQueue = [];

var TrackService = /*#__PURE__*/function () {
  function TrackService(urlEventTrack) {
    _classCallCheck(this, TrackService);

    ipAddress = this.getRealIp();
    this.urlEventTrack = urlEventTrack;
    processQueue();
  }

  _createClass(TrackService, [{
    key: "sendPageHitTrack",
    value: function sendPageHitTrack(token) {
      var params = new URLSearchParams({
        event: 'page-hit',
        token: token,
        time: this.getCurTime(),
        ip: ipAddress,
        insert_id: uuidv1()
      });
      var url = "".concat(this.urlEventTrack, "?").concat(params.toString());
      this.enqueueRequestToTrackEvenUrl(url);
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
      var url = "".concat(this.urlEventTrack, "?").concat(params.toString());
      this.enqueueRequestToTrackEvenUrl(url);
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
      var url = "".concat(this.urlEventTrack, "?").concat(params.toString());
      this.enqueueRequestToTrackEvenUrl(url);
    }
  }, {
    key: "enqueueRequestToTrackEvenUrl",
    value: function enqueueRequestToTrackEvenUrl(url) {
      console.log(url);
      requestQueue.push({
        method: 'get',
        url: url
      });
    }
  }, {
    key: "getRealIp",
    value: function () {
      var _getRealIp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(urlRealIpAdressFind).then(function (response) {
                  return response.json();
                }).then(function (data) {
                  ipAddress = data.ip;
                  return data.ip;
                }).catch(function (error) {
                  console.error(error);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getRealIp() {
        return _getRealIp.apply(this, arguments);
      }

      return getRealIp;
    }()
  }]);

  return TrackService;
}();

function processQueue() {
  if (requestQueue.length === 0) {
    setTimeout(processQueue, 1000);
    return;
  }

  var config = requestQueue.shift(); // Obtenha a próxima solicitação da fila.

  axios(config).then(function (response) {
    console.log('Resposta da solicitação:', response.data);
    processQueue(); // Chame recursivamente para processar a próxima solicitação na fila.
  }).catch(function (error) {
    console.error('Erro na solicitação:', error);
    processQueue(); // Chame recursivamente para processar a próxima solicitação na fila.
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
