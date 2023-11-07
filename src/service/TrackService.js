const { v1: uuidv1 } = require('uuid');
const axios = require('axios');

const urlEventTrack = 'https://events.sdwc.me';
const urlRealIpAdressFind = 'https://api.ipify.org?format=json';
let ipAddress = getRealIp();

export default class TrackService {

    constructor() {
        
    }

    sendPageHitTrack(token) {

        const params = new URLSearchParams({
            event: 'page-hit',
            token: token,
            time: this.getCurTime(),
            ip: this.ipAddress,
            insert_id: uuidv1()
        });
    
        let url = `${urlEventTrack}?${params.toString()}`;
    
        console.log(url);
    }

    sendTrack(token, event, objectId) {

        const params = new URLSearchParams({
            event: event,
            token: token,
            collection_id: objectId,
            time: this.getCurTime(),
            ip: ipAddress,
            insert_id: uuidv1()
        });
    
        let url = `${urlEventTrack}?${params.toString()}`;
    
        console.log(url);
    }

    getCurTime() {
        return new Date().getTime();
    }

    sendFirstClickInterval(token, seconds) {

        const params = new URLSearchParams({
            event: 'first-click-interval',
            token: token,
            value: seconds,
            time: this.getCurTime(),
            ip: ipAddress,
            insert_id: uuidv1()
        });
    
        let url = `${urlEventTrack}?${params.toString()}`;
    
        console.log(url);
    }

    getRealIp() {
        fetch(urlRealIpAdressFind).then(response => response.json()).then(data => {
        ipAddress = data.ip;
        return data.ip;
      })
      .catch(error => {
        console.error(error);
      });
    }

}