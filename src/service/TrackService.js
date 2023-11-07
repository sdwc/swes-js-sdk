
export default class TrackService {

    constructor() {

    }

    sendPageHitTrack(token) {

        const params = new URLSearchParams({
            event: 'page-hit',
            token: token,
            time: getCurTime(),
            ip: ipAddress,
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
            time: getCurTime(),
            ip: ipAddress,
            insert_id: uuidv1()
        });
    
        let url = `${urlEventTrack}?${params.toString()}`;
    
        console.log(url);
    }

}