### SDWC EVENTS STREAMING SDK - SWES SDK

```json{
    // The name of your event
    "event": "name of your event",
    
    //unique-id-of-your-project
    "token": "6972694d809c7390676a138834f8c890", 
    
    // The time an event occurred. ALREADY EXISTs CF
    "time": 1601412131000, 
    
    // An IP address string associated with the event ALREADY EXISTs CF
    "ip": "203.0.113.9", 
    
    // A unique identifier for the event. SDK HAS TO GENERATE THIS AUTOMATICALLY
    "insert_id": "5d958f87-542d-4c10-9422-0ed75893dc81", 
    
    // identify a user associated with your event.OPTIONAL
     "distinct_id": "john.doe@gmail.com",
    
    // any arbtrary value. OPTIONAL
     "value": 1234,
    //Geolocation info OPTIONAL FRONT CLOUD FRONT HEADERS
     "city": "sao_paulo",
    
     "country": "BR"
}
```
  
## EVENT TYPES:

* page-hit
* collection-item-click
* link-click
* show-case-click
* social-click
* first-click-interval

## REQUEST FORMAT:

https://events.sdwc.me?event=page-hit&token=sdwc-c76343df3&insert_id=343fd3334534f5332234f33
https://events.sdwc.me?event=first-click-interval&token=sdwc-c76343df3&insert_id=89fdj393j39384f3&value=50

#With GeoLocation:

https://events.sdwc.me?event=page-hit&token=sdwc-c76343df3&insert_id=343fd3334534f5332234f33&city=sao_paulo&country=BR

### SWES SDK:

Implements a Javascript lib that could capture and transmits realtime events from the user interations.

# Requirements:

* A class needs to be available as singleton instance for all pages
* All requests must be sent to URL https://events.sdwc.me (PRODUCTION)
 - Create a development mode so the requests will be send request to https://homologation.events.sdwc.me (HOMOLOGATION/PRODUCTION)
* A unic user identifier needs to be created and set as a cookie called device_id with a uuid generated when no code is available
  - All requests implicity sends the cookie value to a server
* Event types have to be listed as a ENUM
  - Implements a method swes.getEventTypes() to return the available types
 
