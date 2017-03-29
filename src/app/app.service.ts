import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SLHttpService } from './http.service';

import { Station } from './classes/station';
import { Card } from './classes/card';
import { Departure } from './classes/departure';

@Injectable()
export class AppService {
    private cards: Card[] = [];

    constructor(private http : SLHttpService) {
        this.loadCards();
    }

    getCards(): Card[] {
        return this.cards;
    }

    setCards(cards: Card[]) {
        this.cards = cards;
    }

    addCard(card: Card) {
        this.cards.push(card);
    }

    deleteCard(card: Card) {
        var index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
        } else {
            // Tried to delete non-existing card
            console.error('Tried to delete non existing card: '+card);
        }
    }

    saveCards() {
        // TODO: Save cards
    }

    loadCards() {
        // TODO: Load cards
    }
}
