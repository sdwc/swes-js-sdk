let pageToken;
let trackPageview = false;
let trackFirstEventInterval = false;
let initTime = false;

let urlEventTrack = 'https://events.sdwc.me';

export const track = function track(event, objectId, extraObj) {
    console.log(event);
    console.log(objectId);
    console.log(extraObj);

    let diffSeconds = 0;

    if(trackFirstEventInterval) {

        const diffTime = Math.abs(initTime - new Date());
        diffSeconds = Math.ceil(diffTime / (1000)); 
        trackFirstEventInterval = false;
    }

    sendTrack();
};

export const init = function init(token, extraObj) {
    pageToken = token;

    if(extraObj != null) {
        trackPageview = extraObj.track_pageview != undefined ? extraObj.track_pageview : false;
        trackFirstEventInterval = extraObj.track_firsteventinterval != undefined ? extraObj.track_firsteventinterval : false;

        if(trackFirstEventInterval) {
            initTime = new Date();
        }
    }

    sendPageHitTrack(token);
};

function sendTrack(token) {

}

function sendPageHitTrack(token) {

    const params = new URLSearchParams({
        event: 'page-hit',
        token: token
    });

    let url = `${urlEventTrack}?${params.toString()}`;

    console.log(url);
}



