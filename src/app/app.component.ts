import { Component } from '@angular/core';
import { Departure } from './departure';

@Component({
    selector: 'app',
    template: `
        <top [name]="name"></top>
        <div class="wrapper">
            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" *ngFor="let line of subscribedLines">
                    <div class="panel">
                        <div class="panel--header">
                            <i class="fa fa-fw fa-info-circle"></i> {{ line.start.name }} - {{ line.end.name }}
                        </div>
                        <div class="panel--contents">
                            <next-departures [departures]="line.nextDepartures"></next-departures>
                        </div>
                    </div>
                </div>
                <div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
                    <div class="panel">
                        <div class="panel--header">
                            <i class="fa fa-fw fa-info-circle"></i> Start - Stop
                        </div>
                        <div class="panel--contents">
                            <compact-departures></compact-departures>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        
    `]
})
export class AppComponent  {
    public name = 'Commuter Board';
    subscribedLines = [
        {
            start: {
                name: 'Stockholms Östra',
            },
            end: {
                name: 'Odenplan',
            },
            nextDepartures: [
                new Departure('4', 'train', 'Stockholms östra', new Date(2017, 3, 21, 10, 30), 'Odenplan', new Date(2017, 3, 21, 10, 39)),
                new Departure('4654', 'bus', 'Stockholms östra', new Date(2017, 3, 21, 10, 45), 'Odenplan', new Date(2017, 3, 21, 10, 54)),
                new Departure('687B', 'ship', 'Stockholms östra', new Date(2017, 3, 21, 11, 0), 'Odenplan', new Date(2017, 3, 21, 10, 09)),
            ]
        },
        {
            start: {
                name: 'Storängsvägen',
            },
            end: {
                name: 'Danderyds sjukhus',
            },
            nextDepartures: [
                new Departure('604', 'bus', 'Storängsvägen', new Date(2017, 3, 21, 11, 0), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 15)),
                new Departure('604', 'bus', 'Storängsvägen', new Date(2017, 3, 21, 11, 20), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 35)),
                new Departure('604', 'bus', 'Storängsvägen', new Date(2017, 3, 21, 11, 40), 'Danderyds sjukhus', new Date(2017, 3, 21, 11, 55)),
            ]
        },
    ];
}
