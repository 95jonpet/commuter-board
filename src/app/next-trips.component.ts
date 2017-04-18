import { Component, Input } from '@angular/core';
import { Departure } from './classes/departure';

@Component({
    selector: 'next-trips',
    template: `
        <table class="trip" *ngFor="let trip of trips">
            <tr class="departure" *ngFor="let departure of trip">
                <td><i class="fa fa-fw fa-{{ departure.lineType }}"></i> {{ departure.lineName }}</td>
                <td>{{ departure.departureTime }} {{ departure.departureName }}</td>
                <td>{{ departure.arrivalTime() }} {{ departure.arrivalName }}</td>
            </tr>
        </table>
    `,
    styles: [`
        .trip {
            width: 100%;
        }
        .trip:not(:last-child) {
            border-bottom: 1px solid #ccc;
        }
        .departure td:last-child {
            text-align: right;
        }

        .departure td:nth-child(1) {
            width: 20%;
        }
        .departure td:nth-child(2) {
            width: 40%;
        }
        .departure td:nth-child(3) {
            width: 40%;
        }
    `]
})
export class NextTripsComponent  {
    @Input()
    trips: Departure[][];
}
