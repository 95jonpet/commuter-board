import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'top',
    template: `
        <header class="header">
            <div class="wrapper">
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-md-1-2">
                        <h1 class="title">{{ title }}</h1>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2">
                        <div class="toolbar">
                            <button (click)="onCreateCard()"><i class="fa fa-plus"></i></button>
                            <button (click)="onEnterEditMode()" [ngClass]="{'active': editing}"><i class="fa fa-pencil"></i></button>
                            <button (click)="onInformation()" ><i class="fa fa-info"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `,
    styles: [`
        .header {
            width: 100%;
            background-color: #222;
            box-shadow: 0 5px 8px rgba(0, 0, 0, .5);
        }
        .header .title {
            color: #ccc;
            font-size: 22px;
            font-weight: 400;
            margin: 0;
        }
        .header .wrapper {
            padding: 20px 40px;
        }

        .toolbar {
            font-size: 22px;
            text-align: right;
        }
        .toolbar button {
            color: #999;
            background: none;
            border: none;
            outline: none;
        }
        .toolbar button:hover, .toolbar button:focus {
            color: #ccc;
        }
        .toolbar button.active {
            color: #fff;
        }
        .toolbar .fa {
            cursor: pointer;
        }
        .toolbar button:not(:last-child) {
            margin-right: .5em;
        }
    `]
})
export class TopComponent {
    @Input() title: string;
    @Input() editing: boolean;

    @Output() createCard: EventEmitter<any> = new EventEmitter();
    @Output() infoEventEmitter: EventEmitter<any> = new EventEmitter();
    @Output() editCards: EventEmitter<any> = new EventEmitter();

    onCreateCard() {
        this.createCard.emit();
    }

    onEnterEditMode() {
        this.editCards.emit();
    }

    onInformation(){
        this.infoEventEmitter.emit();
    }
}
