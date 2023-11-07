var track = function track(event, extraObj) {
  console.log(event);
  console.log(extraObj);
};
var init = function init(token) {
  console.log("Entrei no init");
  console.log(token);
};

export { init, track };
