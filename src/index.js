let TrackService = import('../src/service/TrackService.js');

const { v1: uuidv1 } = require('uuid');
const axios = require('axios');

let pageToken;
let trackPageview = false;
let trackFirstEventInterval = false;
let initTime = false;
let urlEventTrack = 'https://events.sdwc.me';
let urlRealIpAdressFind = 'https://api.ipify.org?format=json';
let ipAddress = getRealIp();

let trackService = new TrackService();

export const track = function track(event, objectId, extraObj) {

    if(trackFirstEventInterval) {
        trackFirstEventInterval = false;
        sendFirstClickInterval(pageToken, Math.ceil(Math.abs(initTime - new Date()) / (1000)));
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

function sendFirstClickInterval(token, seconds) {

    const params = new URLSearchParams({
        event: 'first-click-interval',
        token: token,
        value: seconds,
        time: getCurTime(),
        ip: ipAddress,
        insert_id: uuidv1()
    });

    let url = `${urlEventTrack}?${params.toString()}`;

    console.log(url);
}


function getCurTime() {
    return new Date().getTime();
}

function getRealIp() {
    fetch(urlRealIpAdressFind).then(response => response.json()).then(data => {
    ipAddress = data.ip;
    return data.ip;
  })
  .catch(error => {
    console.error(error);
  });
}



