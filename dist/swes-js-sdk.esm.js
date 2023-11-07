var pageToken;
var track = function track(event, objectId, extraObj) {
  console.log(event);
  console.log(objectId);
  console.log(extraObj);
  console.log(pageToken);
};
var init = function init(token, extraObj) {
  pageToken = token;
  console.log("Entrei no init");
  console.log(token);
  console.log(extraObj);
};

export { init, track };
