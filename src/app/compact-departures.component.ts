import { Component, Input } from '@angular/core';
import { Departure } from './classes/departure';

@Component({
    selector: 'compact-departures',
    template: `
        <table class="departures">
            <tr class="departure" *ngFor="let departure of departures">
                <td><i class="fa fa-fw fa-{{ departure.lineType }}"></i> {{ departure.lineName }} <span class="pipe">|</span></td>
                <td>{{ departure.departureTime() }} {{ departure.departureName }}</td>
                <td>{{ departure.arrivalTime() }} {{ departure.arrivalName }}</td>
            </tr>
        </table>
    `,
    styles: [`
        .departures {
            width: 100%;
        }
        .departure td:last-child {
            text-align: right;
        }
        .pipe {
            color: #ccc;
        }
    `]
})
export class CompactDeparturesComponent  {
    @Input()
    departures: Departure[];
}
