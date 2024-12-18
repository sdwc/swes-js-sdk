import axios from 'axios';

const requestQueue = [];

const pathGeo = '/geo';
let cacheGeo = null;

export default class TrackService {

    constructor(urlEventTrack) {
        this.urlEventTrack = urlEventTrack;
        processQueue();
    }

    sendPageHitTrack(token) {

        let referrer = null;
        try {
            referrer = new URL(window.frames.top.document.referrer).hostname;
        } catch (error) {
            console.error('err to get referrer:', error);
        }
        
        const params = new URLSearchParams({
            event: 'hit',
            object_type: 'page',
            token: token,
            referrer: referrer ? referrer : 'empty'
        });

        axios({ method: 'get', url: `${this.urlEventTrack}${pathGeo}` })
        .then(response => {

            cacheGeo = response.data;
            this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
        })
        .catch(error => {
            console.error('err to get geo:', error);
            this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
        });
    }

    sendTrack(token, event, objectType, objectId) {

        const params = new URLSearchParams({
            event: event,
            token: token,
            object_type: objectType,
            object_id: objectId
        });
        
        this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
    }

    sendFirstClickInterval(token, seconds) {

        const params = new URLSearchParams({
            event: 'hit',
            token: token,
            object_type: 'first-click-interval',
            interval: seconds
        });
    
        this.enqueueRequestToTrackEvenUrl(`${this.urlEventTrack}?${params.toString()}`);
    }
    
    enqueueRequestToTrackEvenUrl(url) {

        if(cacheGeo != null ) {

            const params = new URLSearchParams({
                country: cacheGeo.countryCode,
                city: cacheGeo.city
            });

            url = `${url}&${params.toString()}`;
        }

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