import { Departure } from './departure';
import { Station } from './station';
import { SLHttpService } from '../http.service';
import { RealtimeInfo } from './realtimeInfo';
import { PlanData } from './planData';
import { CardStorageService } from '../cardstorage.service';

export class Card {
    static colors: string[] = [
        '#007991',
        '#72789a',
        '#8db360',
        '#fa9418',
        '#a2a284',
        '#b388eb',
        '#1b998b',
    ];

    type: String;
    from: Station;
    id: number;
    to?: Station;
    departures?: Departure[] = [];
    trips?: Departure[][] = [];
    color: string = '#007991';

    bus?: boolean;
    boat?: boolean;
    train?: boolean;
    subway?: boolean;

    constructor(type: String, from: Station, to: Station, id: number,
                private http: SLHttpService) {
        if (type != 'trip' && type != 'station') {
            throw new Error('Illegal card type: '+type);
        }

        this.type = type;
        this.from = from;
        this.to = to;
        this.id = id;

        this.fetchDepartures();
    }

    private addDeparture(departure: Departure): void {
        this.departures.push(departure);
    }

    private addTrip(departures: Departure[]): void {
        this.trips.push(departures);
    }

    private fetchTripDepartures(): void {
        var card = this;
        this.http.getTrip(new PlanData(this.from.id, this.to.id))
            .then(function (response) {
                card.trips = [] // Reset trips on response
                response.TripList.Trip.forEach(function (trip: any) {
                    var departures: Departure[] = [];
                    [].concat(trip.LegList.Leg).filter(function (leg: any) {
                            return leg.type.toLowerCase() != 'walk';
                        })
                        .forEach(function (leg: any) {
                            var destinationDateString = leg.Destination.rtDate && leg.Destination.rtTime
                                ? leg.Destination.rtDate+' '+leg.Destination.rtTime
                                : leg.Destination.date+' '+leg.Destination.time;

                            departures.push(new Departure(
                                leg.line,
                                card.getTransportType(leg.type),
                                leg.Origin.name,
                                leg.Origin.rtTime || leg.Origin.time,
                                leg.Destination.name,
                                new Date(destinationDateString)
                            ));
                    });
                    card.addTrip(departures);
                });
            });
    }

    private fetchStationDepartures(): void {
        var card = this;
        let realtime: RealtimeInfo = new RealtimeInfo(this.from.id, 30);
        if (this.bus) realtime.Bus = this.bus;
        if (this.boat) realtime.Ship = this.boat;
        if (this.train) realtime.Tram = this.train;
        if (this.subway) realtime.Train = this.subway;

        this.http.getRealtime(realtime)
            .then(function (data) {
                card.departures = []; // Reset departures on response
                [].concat(data.Buses || [], data.Metros || [], data.Trains || [], data.Trams || [], data.Ships || []) // Collect data
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
                    card.addDeparture(new Departure(
                        object.LineNumber,
                        card.getTransportType(object.TransportMode),
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

    public updateDepartures(): void {
        this.fetchDepartures();
    }

    private getTransportType(type: string) {
        type = type.toLowerCase();

        switch (type) {
            case 'metro':
                return 'subway';
            case 'tram':
                return 'train';
        }

        return type;
    }

    public cycleColor(): void {
        var index = Card.colors.indexOf(this.color) || 0;
        this.color = Card.colors[(index + 1) % Card.colors.length];
    }
}
