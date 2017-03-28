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
        var card = this;
        this.http.getRealtime(new RealtimeInfo(this.from.id, 30))
            .then(function (data) {
                [].concat(data.Buses, data.Metros, data.Trains, data.Trams, data.Ships) // Collect data
                .sort(function (a, b) { // Sort based on departure time / line number
                    var aVal = a.DisplayTime.split(' ')[0];
                    var bVal = b.DisplayTime.split(' ')[0];

                    if (aVal == bVal) {
                        return a.LineNumber - b.LineNumber;
                    } else if (aVal == 'Nu') {
                        return -1;
                    } else if (bVal == 'Nu') {
                        return 1;
                    } else {
                        return aVal - bVal;
                    }
                })
                .slice(0, 5) // Limit results
                .forEach(function (object) { // Add departures to card
                    var type = '';
                    switch (object.TransportMode.toLowerCase()) {
                        case 'metro':
                            type = 'subway';
                            break;
                        default:
                            type = object.TransportMode.toLowerCase();
                            break;
                    }

                    card.addDeparture(new Departure(
                        object.LineNumber,
                        type,
                        card.from.name,
                        object.DisplayTime,
                        object.Destination,
                        null
                    ));
                });
            });
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