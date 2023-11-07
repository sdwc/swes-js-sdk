import TrackService from '../src/service/TrackService.js';

let pageToken;
let trackPageview = false;
let trackFirstEventInterval = false;
let initTime = false;

let trackService = new TrackService();

export const track = function track(event, objectId, extraObj) {

    if(trackFirstEventInterval) {
        trackFirstEventInterval = false;
        trackService.sendFirstClickInterval(pageToken, Math.ceil(Math.abs(initTime - new Date()) / (1000)));
    }

    trackService.sendTrack(pageToken, event, objectId);
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

    trackService.sendPageHitTrack(token);
};



