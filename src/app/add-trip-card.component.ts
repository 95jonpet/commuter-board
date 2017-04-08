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
        <form class="pure-form">
            <fieldset>
                <legend>Add new trip</legend>

                <div class="pure-g">
                    <div class="pure-u-5-24">
                        <input [(ngModel)]="fromName" (ngModelChange)='saveStartName($event)' class="start-input" type="text" name="start" placeholder="Start">
                    </div>
                    <div class="pure-u-1-24"></div>
                    <div class="pure-u-5-24">
                        <input [(ngModel)]="toName" (ngModelChange)='saveDestName($event)' class="destination-input" type="text" name="destination" placeholder="Destination">
                    </div>
                    <div class="pure-u-13-24">

                        <input id="boat" class="checkbox-custom" type="checkbox">
                        <label for="boat" class="checkbox-custom-label"><i class="fa fa-ship"></i> Boat</label>

                        <input id="train" class="checkbox-custom" type="checkbox" checked>
                        <label for="train" class="checkbox-custom-label"><i class="fa fa-train"></i> Train</label>

                        <input id="subway" class="checkbox-custom" type="checkbox" checked>
                        <label for="subway" class="checkbox-custom-label"><i class="fa fa-subway"></i> Subway</label>

                        <input id="bus" class="checkbox-custom" type="checkbox" checked>
                        <label for="bus" class="checkbox-custom-label"><i class="fa fa-bus"></i> Bus</label>
                    </div>

                </div>
                <a (click)="onAddCard()" class="pure-button" href="#">Add new card</a>
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
    `]
})
export class AddTripCardComponent {
    @Output() onClose = new EventEmitter<void>();
    private fromName: string = '';
    private toName: string = '';

    constructor(private app : AppService, private http: SLHttpService, private cookies: CookieService,
                private cardstorage: CardStorageService) {
        this.loadCookies();
    }

    loadCookies(){
        if(this.cookies.get("add_trip_start_input") != undefined){
            this.fromName = this.cookies.get("add_trip_start_input");
        }

        if(this.cookies.get("add_trip_dest_input") != undefined){
            this.toName = this.cookies.get("add_trip_dest_input");
        }
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

    onAddCard() {
        this.removeCookies();

        var component = this;
        if (this.fromName == '' || this.toName == '') {
            return;
        }

        this.http.getLocations(new Location(this.fromName))
            .then(fromData => {
                if (fromData.length < 1) {
                    // TODO: No show result found alert
                    return;
                }

                this.http.getLocations(new Location(this.toName))
                    .then(toData => {
                        if (toData.length < 1) {
                            // TODO: No show result found alert
                            return;
                        }

                        component.app.addCard(new Card(
                            'trip',
                            new Station(Number(fromData[0].SiteId), fromData[0].Name),
                            new Station(Number(toData[0].SiteId), toData[0].Name),
                            this.cardstorage.generateId(),
                            this.http,
                        ));
                        component.onClose.emit();

                        // Reset inputs
                        component.fromName = '';
                        component.toName = '';
                    });
            });
    }
}
