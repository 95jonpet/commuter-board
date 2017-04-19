import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Departure } from './classes/departure';


@Component({
    selector: 'information',
    template: `
        <div class="modal" (click)="onClose()">
            <div class="modal-content" (click)="$event.stopPropagation()">
            	<div class="panel">
            		<div class="panel--header">
            			<div class="pure-g">
            				<div class="pure-u-1-2">
		            			<span class="title"><i class="fa fa-info-circle"></i><span id="add-text">Information</span></span>
            				</div>
            				<div class="pure-u-1-2">
		                		<span class="close" (click)="onClose()">&times;</span>
            				</div>
	                	</div>
                	</div>
                	<div class="panel--contents">
                        <h4>What is Commuter Board?</h4>
                        <p>Commuter Board is a digital message board containing information about SL's
                        commuting information tailored by you. The board contains cards of two sorts. Single station
                        card is a card connected to a single commuting end point, for example a subway station or bus stop.
                        This card then shows times of departures close to the present from that end point with continuously
                        updating information. The other type of card is a trip card where you specify the start and destination
                        endpoints. This card will show trips from start to destination using only SL's end points. Trips are a collection
                        of departures connecting start to destination such that every departure can be taken in one trip</p>

                        <h4>How do I use Commuter Board?</h4>
                        <p>Using the Commuter Board is simple. To add a card you press the + button in the upper right corner of the screen.
                        This opens a panel from which you can choose either if you want to create a staion card or a trip card. Text
                        fields with responsive auto completion makes it easy for you to enter the correct end point. Uncheck the boxes
                        if there is a way of travel you don't want included in the card. Then click 'Add new card' and a card is added
                        to your very own Commuter Board. These cards are saved locally on your computer. If you want to remove or change
                        color of card you press the pen icon in the upper right corner and options to remove or change color will appear
                        on the card. Click the pen icon again to hide these options.</p>
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
            max-height: 100vh;
            overflow-y: auto;
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
export class InformationComponent {
    informationText: string = "Loading..."
    @Output() showingInfo = new EventEmitter<boolean>();

    onClose() {
        this.showingInfo.emit(false); // Trigger close from parent
    }


}
