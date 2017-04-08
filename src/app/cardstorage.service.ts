import {Injectable} from '@angular/core'
import {CookieService} from 'angular2-cookie/services/cookies.service'
import { Card } from './classes/card'
import { Station } from './classes/station'
import {SLHttpService} from './http.service'

@Injectable()
export class CardStorageService {
    storedCardKeys: Array<number>; //TODO In order

    constructor (private cookies: CookieService, private http: SLHttpService) {
        //localStorage.clear();
        this.storedCardKeys = JSON.parse(localStorage.getItem('card_keys'));
        if(this.storedCardKeys == null){
            this.storedCardKeys = new Array<number>();
        }
        if(this.storedCardKeys == undefined){
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
        console.log(max);
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

    private extractCard(key: string): Card {
        let type = localStorage.getItem(key + '_type');


        let from: Station = new Station(+localStorage.getItem(key + '_from_id'),
                                        localStorage.getItem(key + '_from_name'))
        let to: Station;
        if(type == 'trip') {
            let to: Station = new Station(+localStorage.getItem(key + '_to_id'),
                                            localStorage.getItem(key + '_to_name'))
        }else{
            to = null;
        }
        let id: number = +localStorage.getItem(key + '_id');

        let card: Card = new Card(type, from, to, id, this.http);


        if(localStorage.getItem(key + '_bus') != undefined){
            card.bus = localStorage.getItem(key + '_bus') == 'true';
        }
        if(localStorage.getItem(key + '_boat') != undefined){
            card.boat = localStorage.getItem(key + '_boat') == 'true';
        }
        if(localStorage.getItem(key + '_train') != undefined){
            card.train = localStorage.getItem(key + '_train') == 'true';
        }
        if(localStorage.getItem(key + '_subway') != undefined){
            card.subway = localStorage.getItem(key + '_subway') == 'true';
        }

        return card;
    }

    /* Stores the card in seperate cookies */ 
    storeCard(card: Card){
        if(typeof(card) == undefined){
            console.log('card is undefined');
            return;
        }
        console.log('stored keys: ' + this.storedCardKeys.length);
        let id = card.id;
        this.storedCardKeys.push(id);
        let key = id.toString();

        // ID
        localStorage.setItem(key + '_id', card.id.toString());

        //TYPE
        localStorage.setItem(key + '_type', card.type.toString());
        
        //FROM
        localStorage.setItem(key + '_from_name', card.from.name);
        localStorage.setItem(key + '_from_id', card.from.id.toString());

        if(card.type == 'trip'){
            localStorage.setItem(key + '_to_name', card.to.name);
            localStorage.setItem(key + '_to_id', card.to.id.toString());
        }

        if(card.bus){
            localStorage.setItem(key + '_bus', '' + card.bus);
        }
        if(card.boat){
            localStorage.setItem(key + '_boat', '' + card.boat);
        }
        if(card.train){
            localStorage.setItem(key + '_train', '' + card.train);
        }
        if(card.subway){
            localStorage.setItem(key + '_subway', '' + card.subway);
        }

        localStorage.setItem('card_keys', JSON.stringify(this.storedCardKeys));
    }

    /* Removes the given card from localstorage */
    removeStoredCard(card: Card){
        let key = card.id.toString();
        localStorage.removeItem(key + '_id');
        localStorage.removeItem(key + '_type');
        localStorage.removeItem(key + '_from_name');
        localStorage.removeItem(key + '_from_id');
        localStorage.removeItem(key + '_to_name');
        localStorage.removeItem(key + '_to_id');
        localStorage.removeItem(key + '_bus');
        localStorage.removeItem(key + '_boat');
        localStorage.removeItem(key + '_train');
        localStorage.removeItem(key + '_subway');
        this.storedCardKeys.splice(this.storedCardKeys.indexOf(card.id),1)
        localStorage.setItem('card_keys', JSON.stringify(this.storedCardKeys));
    }


    debug(){
        console.log();
    }
}