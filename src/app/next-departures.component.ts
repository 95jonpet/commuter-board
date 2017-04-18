import { Component, Input } from '@angular/core';
import { Departure } from './classes/departure';

@Component({
    selector: 'next-departures',
    template: `
        <table class="departures">
            <tr class="departure" *ngFor="let departure of departures">
                <td>{{ departure.departureTime }}</td>
                <td><i class="fa fa-fw fa-{{ departure.lineType }}"></i> {{ departure.lineName }}</td>
                <td>{{ departure.arrivalName }}</td>
            </tr>
        </table>
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
        .departures .departure:not(:last-child) {
            border-bottom: 1px solid #ddd;
        }
        table {
            width: 100%;
        }
    `]
})
export class NextDeparturesComponent  {
    @Input()
    departures: Departure[];
}
