import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Stop } from './classes/stop';
import { Card } from './classes/card';
import { Departure } from './classes/departure';

@Injectable()
export class AppService {
    private cards: Card[] = [
        new Card ('station', 'Stockholms östra', null, [
            new Departure('4', 'train', 'Stockholms östra', new Date(2017, 3, 21, 10, 30), 'Odenplan', new Date(2017, 3, 21, 10, 39)),
            new Departure('14', 'subway', 'Stockholms östra', new Date(2017, 3, 21, 10, 30), 'Odenplan', new Date(2017, 3, 21, 10, 39)),
            new Departure('687B', 'ship', 'Stockholms östra', new Date(2017, 3, 21, 11, 0), 'Odenplan', new Date(2017, 3, 21, 10, 09)),
        ]),
        new Card ('trip', 'Storängsvägen', 'Danderyds sjukhus', [
            new Departure('604', 'bus', 'Storängsvägen', new Date(2017, 3, 21, 11, 0), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 15)),
            new Departure('604', 'subway', 'Storängsvägen', new Date(2017, 3, 21, 11, 20), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 35)),
            new Departure('604', 'bus', 'Storängsvägen', new Date(2017, 3, 21, 11, 40), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 55)),
        ]),
    ];

    constructor(private http : Http) {}

    getCards(): Card[] {
        return this.cards;
    }

    setCards(cards: Card[]) {
        this.cards = cards;
    }

    addCard(card: Card) {
        this.cards.push(card);
    }

    getStops (): Observable<Stop[]> {
        return this.http
            .get('https://api.sl.se/api2/LineData.json?model=Site&key=00b60d61652548248190f7be606d63f2')
            .map(this.extractStopData);
    }

    private extractStopData(res: Response) {
        let body = res.json().map(function (stop : any) {
            return <Stop>({
                id: stop.SiteId,
                name: stop.SiteName,
                postcode: stop.StopAreaNumber,
            });
        });
        return body.data || { };
    }
}
