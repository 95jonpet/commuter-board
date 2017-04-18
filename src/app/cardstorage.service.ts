import {Injectable} from '@angular/core'
import {CookieService} from 'angular2-cookie/services/cookies.service'
import { Card } from './classes/card'
import { Station } from './classes/station'
import {SLHttpService} from './http.service'

@Injectable()
export class CardStorageService {
    storedCardKeys: Array<number>; 

    constructor (private cookies: CookieService, private http: SLHttpService) {
        //localStorage.clear();
        this.storedCardKeys = JSON.parse(localStorage.getItem('card_keys'));
        if(this.storedCardKeys == null || this.storedCardKeys == undefined){
            this.storedCardKeys = new Array<number>();
        }
    }

    /* Generates a unique id to identify storage key */
    /* Easy generation by just creating a new id with id one bigger
    * than the previously biggest one */
    generateId(): number {
        let max = -1;
        for(let i = 0; i < this.storedCardKeys.length; i++){
            if(this.storedCardKeys[i] > max){
                max = this.storedCardKeys[i];
            }
        }
        //console.log(max);
        return max+1;
    }

    /* Returns an array of cards stored in storage */
    getStoredCards(): Array<Card>  {
        let cards: Array<Card> = new Array<Card>();
        this.storedCardKeys.forEach((key, index) => {
            cards.push(this.extractCard(key.toString()));
        })
        return cards;
    }

    /* Extracts a card from localstorage with the given key */
    private extractCard(key: string): Card {
        let storedCardInfo: any = JSON.parse(localStorage.getItem(key));

        let card: Card = new Card(storedCardInfo.type, storedCardInfo.from, storedCardInfo.to, storedCardInfo.id, this.http);
        card.bus = storedCardInfo.bus;
        card.boat = storedCardInfo.boat;
        card.train = storedCardInfo.train;
        card.subway = storedCardInfo.subway;
        return card;
    }

    /* Stores the card as a stringified JSON object */
    storeCard(card: Card){
        if(typeof(card) == undefined){
            console.log('card is undefined');
            return;
        }

        let cardInfoHolder: any = {};        
        cardInfoHolder.id = card.id;
        cardInfoHolder.type = card.type;
        cardInfoHolder.from = card.from;
        cardInfoHolder.to = card.to;
        cardInfoHolder.bus = card.bus;
        cardInfoHolder.boat = card.boat;
        cardInfoHolder.train = card.train;
        cardInfoHolder.subway = card.subway;

        localStorage.setItem(card.id.toString(), JSON.stringify(cardInfoHolder));

        this.storedCardKeys.push(card.id);
        localStorage.setItem('card_keys', JSON.stringify(this.storedCardKeys));
    }

    /* Removes the given card from localstorage */
    removeStoredCard(card: Card){
        localStorage.removeItem(card.id.toString());
        this.storedCardKeys.splice(this.storedCardKeys.indexOf(card.id),1)
        localStorage.setItem('card_keys', JSON.stringify(this.storedCardKeys));
    }

}