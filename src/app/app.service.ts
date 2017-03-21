import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Stop } from './classes/stop'; 

@Injectable()
export class AppService {
    constructor(private http : Http) {}

    getStops (): Observable<Stop[]> {
        return this.http
            .get('https://api.sl.se/api2/LineData.json?model=Site&key=00b60d61652548248190f7be606d63f2')
            .map(this.extractStopData);
    }

    private extractStopData(res: Response) {
        let body = res.json().map(function (stop : any) {
            return <Stop>({
                id: stop.SiteId,
                name: stop.SiteName,
                postcode: stop.StopAreaNumber,
            });
        });
        return body.data || { };
    }
}
