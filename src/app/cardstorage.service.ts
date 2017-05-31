import {Injectable} from '@angular/core'
import { Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import {CookieService} from 'angular2-cookie/services/cookies.service'
import { Card } from './classes/card'
import { Station } from './classes/station'
import {SLHttpService} from './http.service'

@Injectable()
export class CardStorageService {
    storedCardKeys: Array<number>;
    boardKey: string;

    constructor (private cookies: CookieService, private http: SLHttpService, private store : Http) {
        this.storedCardKeys = [];
        this.boardKey = window.location.hash || 'default';
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
    getStoredCards(): Array<Card> {
        let cards: Array<Card> = new Array<Card>();

        this.store.get('https://peterjonsson.se/commuter/get.php?board='+this.boardKey).toPromise()
        .then(response => {
            let json: any = response.json();

            json.sort((a: any, b: any) => {
                return b.sortId - a.sortId;
            });

            for (var i = 0; i < json.length; i++) {
                json[i].color = json[i].color || '#007991';
                let card: Card = new Card(
                    json[i].type,
                    new Station(json[i].from.id, json[i].from.name),
                    json[i].to ? new Station(json[i].to.id, json[i].to.name) : null,
                    json[i].id,
                    this.http
                );
                card.id = Number.parseInt(json[i].id);
                card.color = '#'+json[i].color;
                cards.unshift(card);
                this.storedCardKeys.unshift(card.id);
            }
        }, error => {
            console.log('error');
            console.log(error);
        });

        cards.forEach(card => {
            card.updateDepartures();
        });
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
        card.color = storedCardInfo.color || '#007991';
        return card;
    }

    /* Stores the card as a stringified JSON object */
    storeCard(card: Card, sortId: number) {
        if (typeof(card) == undefined){
            console.log('card is undefined');
            return;
        }

        let cardInfoHolder: any = {};
        cardInfoHolder.id = card.id;
        cardInfoHolder.type = card.type;
        cardInfoHolder.from = card.from;
        if (card.from) {
            cardInfoHolder.fromId = card.from.id;
            cardInfoHolder.fromName = card.from.name;
        }
        cardInfoHolder.to = card.to;
        if (card.to) {
            cardInfoHolder.toId = card.to.id;
            cardInfoHolder.toName = card.to.name;
        }
        cardInfoHolder.bus = card.bus;
        cardInfoHolder.boat = card.boat;
        cardInfoHolder.train = card.train;
        cardInfoHolder.subway = card.subway;
        cardInfoHolder.color = card.color.substr(1);
        cardInfoHolder.sortId = sortId;

        var data : string = '';
        for (var key in cardInfoHolder) {
            data += '&'+key+'='+cardInfoHolder[key];
        }
        data = encodeURI(data);

        this.store.get('https://peterjonsson.se/commuter/save.php?board='+this.boardKey+'&cardid='+card.id+data).toPromise()
        .then(response => {
            console.log('response');
            console.log(response);
        }, error => {
            console.log('error');
            console.log(error);
        });

        if (this.storedCardKeys.indexOf(card.id) <= -1) {
            this.storedCardKeys.push(card.id);
        }
    }

    /* Removes the given card from localstorage */
    removeStoredCard(card: Card){
        this.store.get('https://peterjonsson.se/commuter/delete.php?board='+this.boardKey+'&cardid='+card.id).toPromise()
        .then(response => {
            console.log('response');
            console.log(response);
        }, error => {
            console.log('error');
            console.log(error);
        });

        this.storedCardKeys.splice(this.storedCardKeys.indexOf(card.id), 1);
    }

}