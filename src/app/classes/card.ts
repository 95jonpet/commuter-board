import { Departure } from './departure';

export class Card {
    type: String;
    fromName: String;
    toName?: String;
    departures?: Departure[];

    constructor(type: String, fromName: String, toName?: String, departures?: Departure[]) {
        if (type != 'trip' && type != 'station') {
            throw new Error('Illegal card type: '+type);
        }

        this.type = type;
        this.fromName = fromName;

        this.toName = toName;
        this.departures = departures;
    }
}