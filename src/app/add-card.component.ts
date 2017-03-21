import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Departure } from './classes/departure';

@Component({
    selector: 'add-card',
    template: `
        <div class="modal">
            <div class="modal-content">
                <span class="close" (click)="onClose()">&times;</span>
                <div class="pure-g">
                    <div class="pure-u-1">Detta är en fin modal. <i class="fa fa-thumbs-o-up"></i></div>
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
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }
        
        .close {
            color: #aaa;
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
