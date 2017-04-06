import {Injectable} from '@angular/core'
import {CookieService} from 'angular2-cookie/services/cookies.service'
import { Card } from './classes/card'
import { Station } from './classes/station'
import {SLHttpService} from './http.service'

//WHOLE COOKIE PART COULD BE (and propably should be) REPLACED WITH LOCALSTORAGE
// Why? since this will be many cookies and too many cookies is not a good thing
//Why did I use cookies? Because localstorage wouldn't work with angular2 so i took the
// easy way out
@Injectable()
export class CookieHandlerService {
    storedCardKeys: Array<string>; //TODO In order

    constructor (private cookies: CookieService, private http: SLHttpService) {
        this.storedCardKeys = <Array<string>> cookies.getObject('card_keys');
        if(this.storedCardKeys == undefined){
            this.storedCardKeys = new Array<string>();
        }
    }

    /* Returns an array of cards stored in cookies 
     * Order of the cards not guaranteed 
     * TODO order of cards */
    getStoredCards(): Array<Card>  {
        let cards: Array<Card> = new Array<Card>();
        this.storedCardKeys.forEach((key, index) => {
            cards.push(this.extractCard(key));
        })
        return cards;
    }

    private extractCard(key: string): Card {
        let type = this.cookies.get(key + '_type');
        let from = <Station> this.cookies.getObject(key + '_from');
        let to: Station;
        if(this.cookies.getObject(key + '_to') != undefined){
            to = <Station> this.cookies.getObject(key + '_to');
        }else{
            to = null;
        }

        let card: Card = new Card(type, from, to, this.http);


        if(this.cookies.getObject(key + '_bus') != undefined){
            card.bus = <boolean> this.cookies.getObject(key + '_bus');
        }
        if(this.cookies.getObject(key + '_boat') != undefined){
            card.boat = <boolean> this.cookies.getObject(key + '_boat');
        }
        if(this.cookies.getObject(key + '_train') != undefined){
            card.train = <boolean> this.cookies.getObject(key + '_train');
        }
        if(this.cookies.getObject(key + '_subway') != undefined){
            card.subway = <boolean> this.cookies.getObject(key + '_subway');
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
        let key = this.findUniqueKey(card);
        this.storedCardKeys.push(key);
        
        this.cookies.put(key + '_type', card.type.toString());
        this.cookies.putObject(key + '_from', <Station> card.from);
        if(card.type == 'trip'){
            this.cookies.putObject(key + '_to', <Station> card.to);
        }

        if(card.bus){
            this.cookies.putObject(key + '_bus', <boolean> card.bus);
        }
        if(card.boat){
            this.cookies.putObject(key + '_boat', <boolean> card.boat);
        }
        if(card.train){
            this.cookies.putObject(key + '_train', <boolean> card.train);
        }
        if(card.subway){
            this.cookies.putObject(key + '_subway', <boolean> card.subway);
        }

        this.cookies.putObject('card_keys', this.storedCardKeys);
    }

    /* Returns a unique key for the given card. Cards are identified 
    * via their type and from (and to) stations plus a version number
    * seperating them from eachother. Key components are seperated with _ 
    * for example: type_from_to_0 or type_from_3*/
    private findUniqueKey(card: Card): string{
        let startOfKey = card.type + '_' + card.from.toString();
        if(card.type == 'trip'){
            startOfKey += '_' + card.to.toString(); 
        }
        let keyVersion = 0;
        let testKey = startOfKey + '_' + keyVersion;
        let index = 0;
        while(index < this.storedCardKeys.length){
            if(this.storedCardKeys[index] == testKey){
                keyVersion++;
                testKey = startOfKey + '_' + keyVersion;
                index = 0;  //reset loop with new testkey
            }
            index++;
        }
        return testKey;
    }


    debug(){
        console.log();
    }
}