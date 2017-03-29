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
        <div class="empty-hint" *ngIf="cards.length == 0">Click <i class="fa fa-plus"></i> to add a card</div>
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
        .delete-button {
            float: right;
            cursor: pointer !important;
            margin-top: -5px;
            margin-right: -15px;
            font-size: 85%;
        }
        .empty-hint {
            position: fixed;
            top: 50%;
            left: 0;
            right: 0;
            text-align: center;
            transform: translateY(-50%);
            font-family: 'Arimo', sans-serif;
            font-size: 3em;
            color: #aaa;
            text-shadow: 0 4px 3px rgba(150, 150, 150, 0.15);
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
