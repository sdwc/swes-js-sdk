import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';

const urlRealIpAdressFind = 'https://api.ipify.org?format=json';
let ipAddress = null;
const requestQueue = [];

export default class TrackService {

    constructor(urlEventTrack) {
        this.urlEventTrack = urlEventTrack;
        processQueue();
    }

    sendPageHitTrack(token) {

        fetch(urlRealIpAdressFind).then(response => response.json()).then(data => {
            ipAddress = data.ip;
            
            const params = new URLSearchParams({
                event: 'page-hit',
                token: token,
                time: this.getCurTime(),
                ip: ipAddress,
                insert_id: uuidv1()
            });
        
            let url = `${this.urlEventTrack}?${params.toString()}`;
        
            this.enqueueRequestToTrackEvenUrl(url);

          })
          .catch(error => {
            console.error(error);

            const params = new URLSearchParams({
                event: 'page-hit',
                token: token,
                time: this.getCurTime(),
                ip: ipAddress,
                insert_id: uuidv1()
            });
        
            let url = `${this.urlEventTrack}?${params.toString()}`;
        
            this.enqueueRequestToTrackEvenUrl(url);
          });

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
    
        let url = `${this.urlEventTrack}?${params.toString()}`;
    
        this.enqueueRequestToTrackEvenUrl(url);
    }

    getCurTime() {
        return new Date().getTime();
    }

    sendFirstClickInterval(token, seconds) {

        const params = new URLSearchParams({
            event: 'first-click-interval',
            token: token,
            interval: seconds,
            time: this.getCurTime(),
            ip: ipAddress,
            insert_id: uuidv1()
        });
    
        let url = `${this.urlEventTrack}?${params.toString()}`;
        this.enqueueRequestToTrackEvenUrl(url);
    }
    
    enqueueRequestToTrackEvenUrl(url) {
        console.log(url);
        requestQueue.push({ method: 'get', url: url });
    }
}

function processQueue() {
    if (requestQueue.length === 0) {
        setTimeout(processQueue, 1000);
        return;
    }

    const config = requestQueue.shift(); // get the next
    
    axios(config)
    .then(response => {
        console.log('Resposta da solicitação:', response.data);
        processQueue();
    })
    .catch(error => {
        console.error('Erro na solicitação:', error);
        processQueue();
    });
}