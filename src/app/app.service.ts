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
        new Card('station', new Station(9192 ,'Slussen'), null, this.http),
        new Card('trip', new Station(9192 ,'Slussen'), new Station(9305, 'Solna Centrum'), this.http),
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
