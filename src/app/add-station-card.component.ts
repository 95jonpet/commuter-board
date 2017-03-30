import { Component, EventEmitter, Input, Output} from '@angular/core';
import { AppService } from './app.service';
import { SLHttpService } from './http.service';
import { Departure } from './classes/departure';
import { Card } from './classes/card';
import { Station } from './classes/station';
import { Location } from './classes/locations';


@Component({
    selector: 'add-station-card',
    template: `
        <form class="pure-form">
            <fieldset>
                <legend>Add new station</legend>

                <div class="pure-g">
                    <div class="pure-u-6-24">
                        <input [(ngModel)]="stationName" (keyup)="onInputChange(stationName)" id="station-name" class="station-input" type="text" name="Station" placeholder="Station name">
                    </div>
                    <div class="pure-u-18-24">

                        <input id="boat" class="checkbox-custom" type="checkbox">
                        <label for="boat" class="checkbox-custom-label"><i class="fa fa-ship"></i> Boat</label>

                        <input id="train" class="checkbox-custom" type="checkbox" checked>
                        <label for="train" class="checkbox-custom-label"><i class="fa fa-train"></i> Train</label>

                        <input id="subway" class="checkbox-custom" type="checkbox" checked>
                        <label for="subway" class="checkbox-custom-label"><i class="fa fa-subway"></i> Subway</label>

                        <input id="bus" class="checkbox-custom" type="checkbox" checked>
                        <label for="bus" class="checkbox-custom-label"><i class="fa fa-bus"></i> Bus</label>
                    </div>
                    <div class="pure-u-18-24 suggestion-box">
                        <div (click)="selectSuggestion(station)" class="suggestion" *ngFor="let station of stations">
                           {{ station.name }}
                           <hr>
                        </div>
                    </div>

                </div>
                <a (click)="onAddCard()" class="pure-button" href="#">Add new card</a>
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
    `]
})
export class AddStationCardComponent {
    @Output() onClose = new EventEmitter<void>();
    private stationName: string = '';

    constructor(private app : AppService, private http: SLHttpService) {}
    
    private stations: Array<Station> = [];
    
    private timer: any = undefined;
    
    private showStations: boolean = true;
    
    onInputChange(str: string) {
        if (str.length < 3) return;
        window.clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.stations = [];
            this.showStations = true;
            this.http.getLocations(new Location(str, 10)).then(res => {
                console.log(res);
                res.forEach((s: any) => {
                    this.stations.push(new Station(s.SiteId, s.Name));
                });
            });
        }, 1000);
        console.log("Bottom", this.stations);
    }

    selectSuggestion(station: Station) {
        console.log("You chose: ", station);
    }

    onAddCard() {
        var component = this;
        if (this.stationName == '') {
            return;
        }

        this.http.getLocations(new Location(this.stationName))
            .then(data => {
                if (data.length < 1) {
                    // TODO: No show result found alert
                    return;
                }

                data.slice(0, 1).forEach((location: any) => {
                    component.app.addCard(new Card('station', new Station(Number(location.SiteId), location.Name), null, this.http));
                    component.onClose.emit();
                });

                // Reset inputs
                component.stationName = '';
            });
    }
}
