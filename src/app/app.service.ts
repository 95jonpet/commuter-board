import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SLHttpService } from './http.service';

import { Station } from './classes/station';
import { Card } from './classes/card';
import { Departure } from './classes/departure';
import { CookieHandlerService } from './cookiehandler.service'

@Injectable()
export class AppService {
    private cards: Card[] = [];

    constructor(private http : SLHttpService, private cookiehandler: CookieHandlerService) {
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
        this.saveCard(card);
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

    saveCard(card: Card){
        this.cookiehandler.storeCard(card);
    }

    //Obsolete? Since fredrik the buffoon structured cardsaving differently
    // Cards are saved when created one by one and not in one batch
    saveCards() {
        // TODO: Save cards
    }

    loadCards() {
        // TODO: Load cards
        this.cards = this.cookiehandler.getStoredCards();  
    }
}
