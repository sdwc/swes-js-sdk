import axios from 'axios';

const requestQueue = [];

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

        let url = `${this.urlEventTrack}?${params.toString()}`;

        this.enqueueRequestToTrackEvenUrl(url);
    }

    sendTrack(token, event, objectId) {

        const params = new URLSearchParams({
            event: event,
            token: token,
            object_id: objectId
        });
    
        let url = `${this.urlEventTrack}?${params.toString()}`;
    
        this.enqueueRequestToTrackEvenUrl(url);
    }

    sendFirstClickInterval(token, seconds) {

        const params = new URLSearchParams({
            event: 'first-click-interval',
            token: token,
            interval: seconds
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