import { Component } from '@angular/core';
import { Departure } from './classes/departure';
import { Card } from './classes/card';
import { AppService } from './app.service';
import { SLHttpService } from './http.service';

@Component({
    selector: 'app',
    template: `
        <top [title]="name" (createCard)="onCreateCard()" (editCards)="onEditMode()"></top>
        <div class="wrapper">
            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" *ngFor="let card of cards">
                    <div class="panel">
                        <div class="panel--header">
                            <i class="fa fa-fw fa-info-circle"></i> {{ card.fromName }}{{ card.type == 'trip' ? ' - '+card.toName : '' }}
                        </div>
                        <div class="panel--contents">
                            <next-departures [departures]="card.departures" *ngIf="card.type == 'station'"></next-departures>
                            <compact-departures [departures]="card.departures" *ngIf="card.type == 'trip'"></compact-departures>
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
    addingCard: boolean = true; //FIXME: Set to false
    editMode: boolean = false;
    cards: Card[];

    constructor(private appService: AppService, private http: SLHttpService) {
        this.cards = appService.getCards();
    }

    onCreateCard() {
        this.addingCard = true;
    }

    onEditMode() {
        alert("Feature not yet implemented");
        this.editMode = true;
    }
}
