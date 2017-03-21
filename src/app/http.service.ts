import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { RealtimeInfo } from './classes/realtimeInfo';
import { Deviations } from './classes/deviations';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SLHttpService {
    constructor (private http: Http) {}
    private urls = {
        deviations: 'http://api.sl.se/api2/deviations.json',
        real_time: 'http://api.sl.se/api2/realtimedeparturesV4.json',
        line_data: 'http://api.sl.se/api2/LineData.json',
        locations: 'http://api.sl.se/api2/typeahead.json',
    };

    private apiKeys = {
        deviations: '5496f1c64ff44177b849d6b8b82009a6',
        real_time: '4802f8b8ac844743b3229e19e246e834',
        line_data: '00b60d61652548248190f7be606d63f2',
        locations: '95d5bdfff9344be38c0564e583a58323',
    };

    getRealtime(data: RealtimeInfo): Promise<any> {
        data.setKey(this.apiKeys.deviations);
        return;
    }

    getDeviations(data: Deviations): Promise<any> {
        let url = this.urls.deviations;
        data.setKey(this.apiKeys.deviations);

        return this.sendGet(url, data.getRequestOptions()).then(response => {
            return new Promise((resolve, reject) => {
                resolve(response);
            });
        }).catch(error => {
            return new Promise((resolve, reject) => { 
                console.error(error);
                reject(error); 
            });
        });
    }

    sendGet(url: string, options: RequestOptions): Promise<Response> {
        return this.http.get(url, options).toPromise();
    }
}
