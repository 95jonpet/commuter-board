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
                		<form class="pure-form">
                			<fieldset>
                				<legend>Add new station</legend>

                				<div class="pure-g">
                					<div class="pure-u-6-24">
		                				<input class="station-input" type="station" name="Station">
		                			</div>
		                			<div class="pure-u-18-24">
		        						
								        <input id="boat" class="checkbox-custom" type="checkbox">
								        <label for="boat" class="checkbox-custom-label"><i class="fa fa-ship"></i> Boat</label>    
                                        <input id="bus" class="checkbox-custom" type="checkbox" checked>
                                        <label for="bus" class="checkbox-custom-label"><i class="fa fa-bus"></i> Bus</label>    
                                        <input id="subway" class="checkbox-custom" type="checkbox" checked>
                                        <label for="subway" class="checkbox-custom-label"><i class="fa fa-subway"></i> Subway</label>
                                        <input id="train" class="checkbox-custom" type="checkbox" checked>
                                        <label for="train" class="checkbox-custom-label"><i class="fa fa-train"></i> Train</label>
								    </div>
                                   
                                </div>
                                <a class="pure-button" href="#">OK</a>
                			</fieldset>
                		</form>
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
            width: 60%;
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

        .panel--header, .panel--contents {
        	padding-left: 40px;
        	padding-right: 20px;
        }

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
    `]
})
export class AddCardComponent {
    @Input() editing: boolean;
    @Output() editingChange = new EventEmitter<boolean>();

    onClose() {
        this.editingChange.emit(false); // Trigger close from parent
    }
}
