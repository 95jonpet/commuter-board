import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SLHttpService } from './http.service';

import { Station } from './classes/station';
import { Card } from './classes/card';
import { Departure } from './classes/departure';
import { CardStorageService } from './cardstorage.service'

@Injectable()
export class AppService {
    private cards: Card[] = [];

    constructor(private http : SLHttpService, private cardstorage: CardStorageService) {
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
            this.cardstorage.removeStoredCard(card);
        } else {
            // Tried to delete non-existing card
            console.error('Tried to delete non existing card: '+card);
        }
    }

    saveCard(card: Card){
        this.cardstorage.storeCard(card);
    }

    saveCards() {
        // TODO: Save cards
    }

    loadCards() {
        // TODO: Load cards
        this.cards = this.cardstorage.getStoredCards();  
    }
}
