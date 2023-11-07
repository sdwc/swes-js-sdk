let pageToken;

export const track = function track(event, objectId, extraObj) {
    console.log(event);
    console.log(objectId);
    console.log(extraObj);
    console.log(pageToken);
};

export const init = function init(token, extraObj) {
    pageToken = token;
    console.log("Entrei no init");
    console.log(token);
    console.log(extraObj);
};


