import { Component, Input } from '@angular/core';
import { Departure } from './classes/departure';

@Component({
    selector: 'next-departures',
    template: `
        <ul class="departures">
            <li class="departure pure-g {{ departure.cancelled ? 'cancelled' : '' }} {{ departure.delay ? 'delayed' : '' }}" *ngFor="let departure of departures">
                <span class="icon pure-u-4-24">
                    <i class="fa fa-fw fa-{{ departure.lineType || 'question-circle' }}"></i>
                </span>
                <span class="line-name pure-u-5-24">{{ departure.lineName }}</span>
                <span class="text pure-u-15-24">
                    {{ departure.departureName }}: <span class="departure-time">{{ departure.departureTime() }}</span> {{ departure.delay }}<br>
                    {{ departure.arrivalName }}: {{ departure.arrivalTime() }}
                </span>
            </li>
        </ul>
    `,
    styles: [`
        .departures {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        .departure.cancelled {
            background-color: #EB9486;
            text-decoration: line-through;
        }
        .departure.delayed {
            background-color: #e9d985;
        }
        .departure.delayed .departure-time {
            text-decoration: line-through;
        }
        .departure .line-name {
            font-size: 1.5em;
            line-height: 2.5em;
        }
        .departure .fa {
            font-size: 3em;
            vertical-align: text-top;
        }
        .departures .departure:not(:last-child) {
            border-bottom: 1px solid #ddd;
        }
        table {
            width: 100%;
        }
        table tr td:last-child {
            text-align: right;
        }
    `]
})
export class NextDeparturesComponent  {
    @Input()
    departures: Departure[];
}
