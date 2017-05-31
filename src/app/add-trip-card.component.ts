import { Component, EventEmitter, Input, Output} from '@angular/core';
import { AppService } from './app.service';
import { SLHttpService } from './http.service';
import { Departure } from './classes/departure';
import { Card } from './classes/card';
import { Station } from './classes/station';
import { Location } from './classes/locations';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CardStorageService } from './cardstorage.service';

@Component({
    selector: 'add-trip-card',
    template: `
        <form class="pure-form" autocomplete="off">
            <fieldset>
                <legend>Add new trip</legend>

                <div class="pure-g">
                    <div class="pure-u-5-24">
                        <input [(ngModel)]="fromName" (focus)="onInputFocus(fromName, true)" (ngModelChange)='origInputChange($event)'
                            class="start-input" type="text" name="start" placeholder="Start">
                    </div>
                    <div class="pure-u-1-24"></div>
                    <div class="pure-u-5-24">
                        <input [(ngModel)]="toName" (focus)="onInputFocus(toName, false)" (ngModelChange)='destInputChange($event)'
                            class="destination-input" type="text" name="destination" placeholder="Destination">
                    </div>
                    <div class="pure-u-13-24">

                        <input [checked]="transportOption.boat" (change)="transportOption.boat = !transportOption.boat" id="boat" class="checkbox-custom" type="checkbox">
                        <label for="boat" class="checkbox-custom-label"><i class="fa fa-ship"></i> Boat</label>

                        <input [checked]="transportOption.train" (change)="transportOption.train = !transportOption.train" id="train" class="checkbox-custom" type="checkbox" checked>
                        <label for="train" class="checkbox-custom-label"><i class="fa fa-train"></i> Train</label>

                        <input [checked]="transportOption.subway" (change)="transportOption.subway = !transportOption.subway" id="subway" class="checkbox-custom" type="checkbox" checked>
                        <label for="subway" class="checkbox-custom-label"><i class="fa fa-subway"></i> Subway</label>

                        <input [checked]="transportOption.bus" (change)="transportOption.bus = !transportOption.bus" id="bus" class="checkbox-custom" type="checkbox" checked>
                        <label for="bus" class="checkbox-custom-label"><i class="fa fa-bus"></i> Bus</label>
                    </div>
                    <div class="pure-u-18-24 suggestion-box" *ngIf="suggestions.length">
                        Showing suggestions for <b *ngIf="focusOrig">origin</b><b *ngIf="!focusOrig">destination</b>
                        <div (click)="selectSuggestion(station)" class="suggestion" *ngFor="let station of suggestions">
                            {{ station.name }}
                        </div>
                    </div>
                </div>
                <a (click)="onAddCard()" class="pure-button" [class.button-disabled]="!(selectedOrigStation && selectedDestStation)" href="#">Add new card</a>
            </fieldset>
        </form>
    `,
    styles: [`
        .start-input, .destination-input {
            width: 100%;
        }
        .start-input {
        	margin-right: 10px;
        }

		.checkbox-custom {
		    opacity: 0;
		    position: absolute;
		}

        .pure-form label{
            margin: 0;
        }

		.checkbox-custom, .checkbox-custom-label {
		    display: inline-block;
		    vertical-align: middle;
		    cursor: pointer;
            float: right;
		}

		.checkbox-custom-label {
		    position: relative;
            margin-left: 10px !important;
            margin-top: 3px !important;
            user-select: none;
		}

		.checkbox-custom + .checkbox-custom-label:before {
		    content: '';
            line-height: 20px;
		    background: #fff;
		    border: 2px solid #ddd;
		    display: inline-block;
		    vertical-align: middle;
		    width: 20px;
		    height: 20px;
		    padding: 2px;
		    margin-right: 10px;
		    text-align: center;
		    background-color: #ccc;
		}

		.checkbox-custom:checked + .checkbox-custom-label:before {
            content: '✓';
            color: white;
		    background-color: #007991;
		}
        .pure-button {
            float:right;
            margin-top: 10%;
        }

        .suggestion {
            cursor:pointer;
        }
        .suggestion:not(:last-child) {
            border-bottom: 1px solid #ccc;
        }

        .button-disabled {
            cursor: not-allowed;
        }
    `]
})
export class AddTripCardComponent {
    @Output() onClose = new EventEmitter<void>();
    private fromName: string = '';
    private toName: string = '';

    private suggestions: Array<Station> = [];
    private selectedOrigStation: Station = null;
    private selectedDestStation: Station = null;
    private focusOrig: boolean = true;
    private timer: any = undefined;

    private readonly NUMBER_OF_RESULTS: number = 5;
    private readonly SUGGESTION_RESPONSE_TIME: number = 300;

    private transportOption: any = {
        bus: true,
        boat: true,
        train: true,
        subway: true
    }

    constructor(private app : AppService, private http: SLHttpService, private cookies: CookieService,
                private cardstorage: CardStorageService) {
        this.loadCookies();
    }

    ngOnInit() {
        this.selectedOrigStation = null;
        this.selectedDestStation = null;
        if (this.fromName) {
            this.focusOrig = true;
            this.fetchStationData(this.fromName);
        } else if (this.toName) {
            this.focusOrig = false;
            this.fetchStationData(this.toName);
        }
    }

    loadCookies(){
        if(this.cookies.get("add_trip_start_input") != undefined){
            this.fromName = this.cookies.get("add_trip_start_input");
        }

        if(this.cookies.get("add_trip_dest_input") != undefined){
            this.toName = this.cookies.get("add_trip_dest_input");
        }
    }

    selectSuggestion(station: Station) {
        if (this.focusOrig) {
            this.fromName = station.name;
            this.selectedOrigStation = station;
        }
        else {
            this.toName = station.name;
            this.selectedDestStation = station;
        }
        this.suggestions = [];
    }

    fetchStationData(str: string) {
        if (str.length < 2) {
            this.suggestions = [];
            return;
        }
        this.http.getLocations(new Location(str)).then((res: Array<any>) => {
            this.suggestions = [];
            res.slice(0, this.NUMBER_OF_RESULTS).forEach((s: any) => {
                this.suggestions.push(new Station(s.SiteId, s.Name));
            });
        });
    }

    onInputFocus(val: string, orig: boolean) {
        this.focusOrig = orig;
        this.fetchStationData(val);
    }

    origInputChange(val: string) {
        this.saveStartName(val);
        this.inputChange(val, true);
    }

    destInputChange(val: string) {
        this.saveDestName(val);
        this.inputChange(val, false);
    }

    inputChange(val: string, orig: boolean) {
        this.focusOrig = orig;
        window.clearTimeout(this.timer);
        this.timer = setTimeout(() => { this.fetchStationData(val); }, this.SUGGESTION_RESPONSE_TIME);
    }

    //TODO Expiration
    saveStartName(newStartName: string){
        this.cookies.put("add_trip_start_input", newStartName);
    }

    //TODO Expiration
    saveDestName(newDestName: string){
        this.cookies.put("add_trip_dest_input", newDestName);
    }

    removeCookies(){
        this.cookies.remove("add_trip_start_input");
        this.cookies.remove("add_trip_dest_input")
    }

    resetFields() {
        this.removeCookies();
        this.toName = '';
        this.fromName = '';
        this.selectedOrigStation = null;
        this.selectedDestStation = null;
        this.suggestions = [];
        this.focusOrig = true;
        this.timer = undefined;
    }

    onAddCard() {

        var component = this;
        if (!this.selectedOrigStation || !this.selectedDestStation) return;
        let card: Card = new Card(
                'trip',
                this.selectedOrigStation,
                this.selectedDestStation,
                this.cardstorage.generateId(),
                this.http
            );

        card.bus = this.transportOption.bus;
        card.boat = this.transportOption.boat;
        card.train = this.transportOption.train;
        card.subway = this.transportOption.subway;

        this.app.addCard(card);
        this.onClose.emit();
        this.resetFields();
    }
}
