let pageToken;
let trackPageview = false;
let trackFirstEventInterval = false;

let initTime = false;

export const track = function track(event, objectId, extraObj) {
    console.log(event);
    console.log(objectId);
    console.log(extraObj);
    console.log(pageToken);

    if(trackFirstEventInterval) {

        const diffTime = Math.abs(initTime - new Date());
        const diffSeconds = Math.ceil(diffTime / (1000)); 

        console.log(diffSeconds);

        trackFirstEventInterval = false;
    }
};

export const init = function init(token, extraObj) {
    pageToken = token;
    console.log(extraObj);

    if(extraObj != null) {
        trackPageview = extraObj.track_pageview != undefined ? extraObj.track_pageview : false;
        trackFirstEventInterval = extraObj.track_firsteventinterval != undefined ? extraObj.track_firsteventinterval : false;
    }

    afterInit();
};

function afterInit() {
    if(trackFirstEventInterval) {
        initTime = new Date();
    }
}

