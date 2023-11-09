import axios from 'axios';

const requestQueue = [];

const pathGeo = '/geo';
let cacheGeo;

export default class TrackService {

    constructor(urlEventTrack) {
        this.urlEventTrack = urlEventTrack;
        processQueue();
    }

    sendPageHitTrack(token) {

        const params = new URLSearchParams({
            event: 'page-hit',
            token: token
        });

        axios({ method: 'get', url: `${this.urlEventTrack}${pathGeo}` })
        .then(response => {
            console.log('Resposta da solicitação:', response.data);

            console.log(response.data.countryCode);
            console.log(response.data.city);

            this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
        })
        .catch(error => {
            console.error('err to get geo:', error);
            this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
        });
    }

    sendTrack(token, event, objectId) {

        const params = new URLSearchParams({
            event: event,
            token: token,
            object_id: objectId
        });
        
        this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
    }

    sendFirstClickInterval(token, seconds) {

        const params = new URLSearchParams({
            event: 'first-click-interval',
            token: token,
            interval: seconds
        });
    
        this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
    }
    
    enqueueRequestToTrackEvenUrl(url) {
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
        processQueue();
    })
    .catch(error => {
        console.error('err to call url:', error);
        processQueue();
    });
}