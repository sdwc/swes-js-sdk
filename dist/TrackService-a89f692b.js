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
        time: getCurTime(),
        ip: ipAddress,
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
        time: getCurTime(),
        ip: ipAddress,
        insert_id: uuidv1()
      });
      var url = "".concat(urlEventTrack, "?").concat(params.toString());
      console.log(url);
    }
  }]);

  return TrackService;
}();

exports = {
  TrackService: TrackService
};
