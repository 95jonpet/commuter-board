import { Departure } from './departure';
import { Station } from './station';
import { SLHttpService } from '../http.service';
import { RealtimeInfo } from './realtimeInfo';

export class Card {
    type: String;
    from: Station;
    to?: Station;
    departures?: Departure[];

    constructor(type: String, from: Station, to: Station, departures: Departure[], private http: SLHttpService) {
        if (type != 'trip' && type != 'station') {
            throw new Error('Illegal card type: '+type);
        }

        this.type = type;
        this.from = from;
        this.to = to;
        this.departures = departures;

        this.fetchDepartures();
    }

    private addDeparture(departure: Departure): void {
        this.departures.push(departure);
    }

    private fetchTripDepartures(): void {

    }

    private fetchStationDepartures(): void {
        console.log(this.http.getRealtime(new RealtimeInfo(this.from.id, 30)));
    }

    private fetchDepartures(): void {
        switch (this.type) {
            case 'trip':
                this.fetchTripDepartures();
                break;
            case 'station':
                this.fetchStationDepartures();
                break;
        }
    }
}