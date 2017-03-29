import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Departure } from './classes/departure';


@Component({
    selector: 'add-card',
    template: `
        <div class="modal" (click)="onClose()">
            <div class="modal-content" (click)="$event.stopPropagation()">
            	<div class="panel">
            		<div class="panel--header">
            			<div class="pure-g">
            				<div class="pure-u-1-2">
		            			<span class="title"><i class="fa fa-plus-circle"></i><span id="add-text">Add card</span></span>
            				</div>
            				<div class="pure-u-1-2">
		                		<span class="close" (click)="onClose()">&times;</span>
            				</div>
	                	</div>
                	</div>
                	<div class="panel--contents">
                        <div class="pure-button-group" role="group" aria-label="...">
                            <button class="pure-button" [ngClass]="{'pure-button-active': type == 'station'}" (click)="setType('station')">Single station</button>
                            <button class="pure-button" [ngClass]="{'pure-button-active': type == 'trip'}" (click)="setType('trip')">Start and destination</button>
                        </div>

                		<add-station-card (onClose)="onClose()" *ngIf="type == 'station'"></add-station-card>
                        <add-trip-card *ngIf="type == 'trip'"></add-trip-card>
                	</div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .pure-button-group .pure-button-active {
            background-color: #42b8dd;
            color: #eee;
            box-shadow: none;
            margin-bottom: 20px;
        }

        .modal {
            display: block;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.6);
        }

        .modal-content {
            background-color: #fefefe;
            margin: 0 auto;
            width: 60%;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
        .panel {
        	margin: 0;
        }

        .title {
            font-size: 20px;
            line-height: 38px;
        }
        .fa-add-circle {
        	float: left;
        }
        #add-text {
        	margin: 0;
        	margin-left: 10px;
        }

        .close {
            color: #fff;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .panel--header, .panel--contents {
        	padding-left: 40px;
        	padding-right: 20px;
        }
    `]
})
export class AddCardComponent {
    @Input() editing: boolean;
    @Output() editingChange = new EventEmitter<boolean>();
    type: String = 'station';

    onClose() {
        this.editingChange.emit(false); // Trigger close from parent
    }

    setType(type: String) {
        this.type = type;
    }
}
