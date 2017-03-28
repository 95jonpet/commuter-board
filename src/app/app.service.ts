import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SLHttpService } from './http.service';

import { Station } from './classes/station';
import { Card } from './classes/card';
import { Departure } from './classes/departure';

@Injectable()
export class AppService {
    private cards: Card[] = [
        new Card ('station', new Station(9192 ,'Slussen'), null, [], this.http),
        /*new Card ('station', 'Stockholms östra', null, [
            new Departure('4', 'train', 'Stockholms östra', new Date(2017, 3, 21, 10, 30), 'Odenplan', new Date(2017, 3, 21, 10, 39)),
            new Departure('14', 'subway', 'Stockholms östra', new Date(2017, 3, 21, 10, 30), 'Odenplan', new Date(2017, 3, 21, 10, 39)),
            new Departure('687B', 'ship', 'Stockholms östra', new Date(2017, 3, 21, 11, 0), 'Odenplan', new Date(2017, 3, 21, 10, 9)),
        ], this.http),
        new Card ('trip', 'Storängsvägen', 'Danderyds sjukhus', [
            new Departure('604', 'bus', 'Storängsvägen', new Date(2017, 3, 21, 11, 0), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 15)),
            new Departure('604', 'subway', 'Storängsvägen', new Date(2017, 3, 21, 11, 20), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 35)),
            new Departure('604', 'bus', 'Storängsvägen', new Date(2017, 3, 21, 11, 40), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 55)),
        ], this.http),*/
    ];

    constructor(private http : SLHttpService) {}

    getCards(): Card[] {
        return this.cards;
    }

    setCards(cards: Card[]) {
        this.cards = cards;
    }

    addCard(card: Card) {
        this.cards.push(card);
    }
}
