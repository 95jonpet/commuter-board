import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="pure-g">
            <div class="pure-u-1-3" *ngFor="let line of subscribedLines">
                <div class="panel">
                    <div class="panel--header">
                        <i class="fa fa-fw fa-info-circle"></i> {{ line.start.name }} - {{ line.end.name }}
                    </div>
                    <div class="panel--contents">
                        <ul class="departures">
                            <li class="departure pure-g {{ departure.cancelled ? 'cancelled' : '' }} {{ departure.delay ? 'delayed' : '' }}" *ngFor="let departure of line.nextDepartures">
                                <span class="icon pure-u-4-24">
                                    <i class="fa fa-fw fa-{{ departure.type || 'question-circle' }}"></i>
                                </span>
                                <span class="line-name pure-u-5-24">{{ departure.name }}</span>
                                <span class="text pure-u-15-24">
                                    Avgång: <span class="departure-time">{{ departure.startTime }}</span> {{ departure.delay }}<br>
                                    Destination: {{ departure.endTime }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .departures {
            list-style-type: none;
            padding: 0;
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
    `]
})
export class AppComponent  {
    name = 'Angular';
    subscribedLines = [
        {
            start: {
                name: 'Stockholms Östra',
            },
            end: {
                name: 'Odenplan',
            },
            nextDepartures: [
                {
                    startTime: '10:30',
                    endTime: '10:39',
                    name: '4',
                    type: 'train',
                },
                {
                    startTime: '10:45',
                    endTime: '10:54',
                    name: '4654',
                    type: 'bus',
                },
                {
                    startTime: '11:00',
                    endTime: '11:09',
                    name: '687B',
                    type: 'ship',
                }
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
                {
                    startTime: '11:00',
                    endTime: '11:15',
                    name: '604',
                    type: 'bus',
                },
                {
                    startTime: '11:20',
                    endTime: '11:35',
                    name: '604',
                    type: 'bus',
                    delay: 5,
                },
                {
                    startTime: '11:40',
                    endTime: '11:55',
                    name: '604',
                    type: 'bus',
                    cancelled: true,
                }
            ]
        },
    ];
}
