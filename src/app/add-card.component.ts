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
		            			<i class="fa fa-plus-circle"></i><p id="add-text">Lägg till</p>
            				</div>
            				<div class="pure-u-1-2">
		                		<span class="close" (click)="onClose()">&times;</span>
            				</div>
	                	</div>
                	</div>
                	<div class="panel--contents">
                	hejhejehj
                	</div>
                </div>
            </div>
        </div>
    `,
    styles: [`

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
            margin: 15% auto;
            border: 1px solid #888;
            width: 80%;
        }
        .panel {
        	margin: 0;
        }

        .fa-add-circle {
        	float: left;
        }
        #add-text {
        	margin: 0;
        	margin-left: 10px;
        	display: inline;
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
    `]
})
export class AddCardComponent {
    @Input() editing: boolean;
    @Output() editingChange = new EventEmitter<boolean>();

    onClose() {
        this.editingChange.emit(false); // Trigger close from parent
    }
}
