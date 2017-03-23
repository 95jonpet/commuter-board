import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Departure } from './classes/departure';


@Component({
    selector: 'add-trip-card',
    template: `
        <form class="pure-form">
            <fieldset>
                <legend>Add new trip</legend>

                <div class="pure-g">
                    <div class="pure-u-5-24">
                        <input class="start-input" type="text" name="start" placeholder="Start">
                    </div>
                    <div class="pure-u-1-24"></div>
                    <div class="pure-u-5-24">
                        <input class="destination-input" type="text" name="destination" placeholder="Destination">
                    </div>
                    <div class="pure-u-13-24">

                        <input id="boat" class="checkbox-custom" type="checkbox">
                        <label for="boat" class="checkbox-custom-label"><i class="fa fa-ship"></i> Boat</label>

                        <input id="train" class="checkbox-custom" type="checkbox" checked>
                        <label for="train" class="checkbox-custom-label"><i class="fa fa-train"></i> Train</label>

                        <input id="subway" class="checkbox-custom" type="checkbox" checked>
                        <label for="subway" class="checkbox-custom-label"><i class="fa fa-subway"></i> Subway</label>

                        <input id="bus" class="checkbox-custom" type="checkbox" checked>
                        <label for="bus" class="checkbox-custom-label"><i class="fa fa-bus"></i> Bus</label>
                    </div>

                </div>
                <a class="pure-button" href="#">Add new card</a>
            </fieldset>
        </form>
    `,
    styles: [`
        .start-input, .destination-input {
            width: 100%;
        }
        .start-input {
        	margin-right: 10px;
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
            margin-top: 3px !important;
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
export class AddTripCardComponent {

}
