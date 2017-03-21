import { Component } from '@angular/core';
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
    departures: Departure[] = [
        new Departure('4', 'bus', 'Stockholms östra', new Date(2017, 3, 21, 10, 30), 'Odenplan', new Date(2017, 3, 21, 10, 39)),
        new Departure('4', 'bus', 'Stockholms östra', new Date(2017, 3, 21, 10, 40), 'Odenplan', new Date(2017, 3, 21, 10, 49)),
        new Departure('4', 'bus', 'Stockholms östra', new Date(2017, 3, 21, 10, 50), 'Odenplan', new Date(2017, 3, 21, 10, 59)),
    ];
}
