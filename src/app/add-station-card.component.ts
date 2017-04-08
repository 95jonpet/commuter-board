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
    selector: 'add-station-card',
    template: `
        <form class="pure-form">
            <fieldset>
                <legend>Add new station</legend>

                <div class="pure-g">
                    <div class="pure-u-6-24">
                        <input [(ngModel)]="stationName" (keyup)="onInputChange(stationName)" (ngModelChange)="saveStationName($event)" id="station-name" class="station-input" type="text" name="Station" placeholder="Station name">
                    </div>
                    <div class="pure-u-18-24">

                        <input [checked]="transportOption.boat" (change)="transportOption.boat = !transportOption.boat" id="boat" class="checkbox-custom" type="checkbox">
                        <label for="boat" class="checkbox-custom-label"><i class="fa fa-ship"></i> Boat</label>

                        <input [checked]="transportOption.train" (change)="transportOption.train = !transportOption.train" id="train" class="checkbox-custom" type="checkbox">
                        <label for="train" class="checkbox-custom-label"><i class="fa fa-train"></i> Train</label>

                        <input [checked]="transportOption.subway" (change)="transportOption.subway = !transportOption.subway" id="subway" class="checkbox-custom" type="checkbox">
                        <label for="subway" class="checkbox-custom-label"><i class="fa fa-subway"></i> Subway</label>

                        <input [checked]="transportOption.bus" (change)="transportOption.bus = !transportOption.bus" id="bus" class="checkbox-custom" type="checkbox">
                        <label for="bus" class="checkbox-custom-label"><i class="fa fa-bus"></i> Bus</label>
                    </div>
                    <div class="pure-u-18-24 suggestion-box">
                        <div (click)="selectSuggestion(station)" class="suggestion" *ngFor="let station of stations">
                           {{ station.name }}
                           <hr>
                        </div>
                    </div>

                </div>
                <a [class.button-disabled]="!selectedStation" (click)="onAddCard()" class="pure-button" href="#">Add new card</a>
            </fieldset>
        </form>
    `,
    styles: [`
        .station-input {
            width: 100%;
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
		    background: #fff;
		    border: 2px solid #ddd;
		    display: inline-block;
		    vertical-align: middle;
		    width: 20px;
		    height: 20px;
		    padding: 2px;
		    margin-right: 10px;
		    text-align: center;
		}

		.checkbox-custom:checked + .checkbox-custom-label:before {
		    background-color: #007991;
		}
        .pure-button {
            float:right;
            margin-top: 10%;
        }

        .suggestion-box {
            margin-top: 10px;
        }
        .suggestion {
            cursor:pointer;
        }

        .button-disabled {
            cursor: not-allowed;
        }
    `]
})
export class AddStationCardComponent {
    @Output() onClose = new EventEmitter<void>();
    private readonly SEARCH_LENGTH_THRESHOLD: number = 3;
    private stationName: string = '';
    private stations: Array<Station> = [];
    private timer: any = undefined;
    private selectedStation: Station = null;

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
        this.fetchStationData(this.stationName);
        this.selectedStation = null;
    }

    loadCookies(){
        if(this.cookies.get("add_station_input") != undefined){
            this.stationName = this.cookies.get("add_station_input");
        }
    }

    saveStationName(newStationName: string){
        //TODO Expiration (see CookieOptionsArgs)
        this.cookies.put("add_station_input", newStationName);
    }

    removeCookies(){
        this.cookies.remove("add_station_input");
    }
    onInputChange(str: string) {
        if (str.length < this.SEARCH_LENGTH_THRESHOLD) return;
        window.clearTimeout(this.timer);
        this.timer = setTimeout(() => { this.fetchStationData(str) }, 300);
    }

    fetchStationData(str: string) {
        if (str === '') return;
        this.stations = [];
        let location: Location = new Location(str);
        this.http.getLocations(new Location(str)).then((res: Array<any>) => {
            if (!res || res === []) return;
            res.forEach((s: any) => {
                this.stations.push(new Station(s.SiteId, s.Name));
            });
        });
    }

    selectSuggestion(station: Station) {
        this.stationName = station.name;
        this.selectedStation = station;
        this.stations = [];
    }

    onAddCard() {
        this.removeCookies();

        var component = this;
        if (!this.selectedStation) {
            return;
        }

        let station: Station = this.selectedStation;
        let card: Card = new Card('station', new Station(station.id, station.name), null, this.cardstorage.generateId(),
                                  this.http);
        card.bus = this.transportOption.bus;
        card.boat = this.transportOption.boat;
        card.train = this.transportOption.train;
        card.subway = this.transportOption.subway;

        component.app.addCard(card);
        component.onClose.emit();
        component.stationName = '';
        component.selectedStation = null;
        component.stations = [];
    }
}
