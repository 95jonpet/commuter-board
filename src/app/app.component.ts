import { Component } from '@angular/core';
import { Departure } from './classes/departure';
import { Card } from './classes/card';
import { AppService } from './app.service';
import { SLHttpService } from './http.service';
import { Deviations } from './classes/deviations';
import { Location } from './classes/locations';
import { RealtimeInfo } from './classes/realtimeInfo';
import { LineData } from './classes/lineData';
import { Situation } from './classes/situation';

@Component({
    selector: 'app',
    template: `
        <top [title]="name" (createCard)="onCreateCard()" (editCards)="onEditMode()"></top>
        <div class="wrapper">
            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" *ngFor="let card of cards">
                    <div class="panel">
                        <div class="panel--header">
                            <i class="fa fa-fw fa-info-circle"></i> {{ card.from.name }}{{ card.type == 'trip' ? ' - '+card.to.name : '' }}
                        </div>
                        <div class="panel--contents">
                            <next-departures [departures]="card.departures" *ngIf="card.type == 'station'"></next-departures>
                            <next-trips [trips]="card.trips" *ngIf="card.type == 'trip'"></next-trips>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <add-card [(editing)]="addingCard" *ngIf="addingCard"></add-card>
    `,
    styles: [`

    `]
})
export class AppComponent  {
    name: String = 'Commuter Board';
    addingCard: boolean = false; //change to true to show on load
    editMode: boolean = false;
    cards: Card[];

    constructor(private app: AppService, private http: SLHttpService) {
        this.cards = app.getCards();
        var d = new Situation();
        http.getSituation(d).then(response => {
            //console.log(response);
        }).catch(error => {
            //console.error(error);
        });
    }

    onCreateCard() {
        this.addingCard = true;
    }

    onStopCreatingCard() {
        this.addingCard = false;
    }

    onEditMode() {
        alert("Feature not yet implemented");
        this.editMode = true;
    }
}
