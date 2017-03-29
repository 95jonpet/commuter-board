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
        <top [title]="name" (createCard)="onCreateCard()" (editCards)="onToggleEditMode()" [editing]="editMode"></top>
        <div class="wrapper">
            <div class="pure-g" dnd-sortable-container [sortableData]="cards">
                <div class="card pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" *ngFor="let card of cards; let i = index" [ngClass]="{'draggable': editMode}" dnd-sortable [dragEnabled]="editMode" [sortableIndex]="i" (onDropSuccess)="onSaveCardPositions()">
                    <div class="panel">
                        <div class="panel--header">
                            <i class="fa fa-fw fa-info-circle"></i> {{ card.from.name }}{{ card.type == 'trip' ? ' - '+card.to.name : '' }}
                            <button class="delete-button pure-button button-error" *ngIf="editMode" (click)="onDeleteCard(card)">
                                <i class="fa fa-fw fa-trash-o"></i>
                            </button>
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
        .card {
            cursor: default !important;
        }
        .card.draggable {
            cursor: move !important;
            cursor: grab !important;
            cursor: -webkit-grab !important;
            cursor: -moz-grab !important;
        }
        .card.draggable:active {
            cursor: move !important;
            cursor: grabbing !important;
            cursor: -webkit-grabbing !important;
            cursor: -moz-grabbing !important;
        }
        .panel {
            margin: 20px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, .4);
        }
        .panel--header {
            padding: 10px 20px;
            background-color: #007991;
            color: #fff;
        }
        .panel--contents {
            padding: 10px;
            background-color: #fff; /*#93B7BE;*/
            line-height: 2em;
        }
        .delete-button {
            float: right;
            cursor: pointer !important;
            margin-top: -5px;
            margin-right: -15px;
            font-size: 85%;
        }
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

    onDeleteCard(card: Card) {
        this.app.deleteCard(card);
    }

    onToggleEditMode() {
        this.editMode = !this.editMode;
    }

    onSaveCardPositions() {
        this.app.saveCards();
    }
}
