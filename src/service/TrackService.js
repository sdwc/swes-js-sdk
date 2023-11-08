const { v1: uuidv1 } = require('uuid');
const axios = require('axios');

const urlRealIpAdressFind = 'https://api.ipify.org?format=json';
let ipAddress = null;
const requestQueue = [];

export default class TrackService {

    constructor(urlEventTrack) {
        ipAddress = this.getRealIp();
        this.urlEventTrack = urlEventTrack;
        this.processQueue();
    }

    sendPageHitTrack(token) {

        const params = new URLSearchParams({
            event: 'page-hit',
            token: token,
            time: this.getCurTime(),
            ip: ipAddress,
            insert_id: uuidv1()
        });
    
        let url = `${this.urlEventTrack}?${params.toString()}`;
    
        this.enqueueRequestToTrackEvenUrl(url);
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
            value: seconds,
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

    processQueue() {
        if (requestQueue.length === 0) {
            setTimeout(this.processQueue, 1000);
            return;
        }
    
        const config = requestQueue.shift(); // Obtenha a próxima solicitação da fila.
        
        axios(config)
        .then(response => {
            console.log('Resposta da solicitação:', response.data);
            this.processQueue(); // Chame recursivamente para processar a próxima solicitação na fila.
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
            this.processQueue(); // Chame recursivamente para processar a próxima solicitação na fila.
        });
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