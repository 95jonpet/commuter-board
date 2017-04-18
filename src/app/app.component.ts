import { Component } from '@angular/core';
import { Departure } from './classes/departure';
import { Card } from './classes/card';
import { AppService } from './app.service';
import { SLHttpService } from './http.service';
import { Deviations } from './classes/deviations';
import { Location } from './classes/locations';
import { RealtimeInfo } from './classes/realtimeInfo';
import { LineData } from './classes/linedata';
import { Situation } from './classes/situation';
import { CardStorageService } from './cardstorage.service'

@Component({
    selector: 'app',
    template: `
        <top [title]="name" (createCard)="onCreateCard()" (editCards)="onToggleEditMode()" (infoEventEmitter)="onShowInformation()" [editing]="editMode"></top>
        <div class="wrapper">
            <div class="pure-g" dnd-sortable-container [sortableData]="cards">
                <div class="card pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" *ngFor="let card of cards; let i = index" [ngClass]="{'draggable': editMode}" dnd-sortable [dragEnabled]="editMode" [sortableIndex]="i" (onDropSuccess)="onSaveCardPositions()">
                    <div class="panel">
                        <div class="panel--header" [ngStyle]="{'background-color': card.color}">
                            {{ card.from.name }}{{ card.type == 'trip' ? ' - '+card.to.name : '' }}
                            <button class="delete-button pure-button button-error" *ngIf="editMode" (click)="onDeleteCard(card)">
                                <i class="fa fa-trash-o"></i>
                            </button>
                            <button class="color-button pure-button button-secondary" *ngIf="editMode" (click)="onChangeCardColor(card)">
                                <i class="fa fa-paint-brush"></i>
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
        <information (showingInfo)="closeInfo($event)" *ngIf="showInfo"></information>
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
            margin-right: -15px;
        }
        .color-button {
            margin-right: 5px;
        }
        .color-button, .delete-button {
            float: right;
            cursor: pointer !important;
            margin-top: -5px;
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
    showInfo: boolean = false;
    editMode: boolean = false;
    cards: Card[];

    constructor(private app: AppService, private http: SLHttpService, private cardstorage: CardStorageService) {
        this.cards = app.getCards();
        var d = new Situation();
        http.getSituation(d).then(response => {
            //console.log(response);
        }).catch(error => {
            //console.error(error);
        });

        // Update card data every 30 seconds
        window.setInterval(() => {
            this.cards.forEach(card => {
                card.updateDepartures();
            });
        }, 30000);
    }

    onCreateCard() {
        this.addingCard = true;
    }

    onShowInformation() {
        this.showInfo = true;
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

    onChangeCardColor(card: Card) {
        card.cycleColor();
        this.app.saveCard(card);
    }

    closeInfo(b: boolean){
        this.showInfo = b;
    }
}
