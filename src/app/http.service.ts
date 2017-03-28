import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Deviations } from './classes/deviations';
import { RealtimeInfo } from './classes/realtimeInfo';
import { LineData } from './classes/linedata';
import { Location } from './classes/locations';
import { Situation } from './classes/situation';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SLHttpService {
    constructor (private http: Http) {}

    private urls = {
        deviations: 'http://api.sl.se/api2/deviations.json',
        real_time: 'http://api.sl.se/api2/realtimedeparturesV4.json',
        line_data: 'http://api.sl.se/api2/LineData.json',
        locations: 'http://api.sl.se/api2/typeahead.json',
        situation: 'http://api.sl.se/api2/trafficsituation.json',
    };

    private apiKeys = {
        deviations: '5496f1c64ff44177b849d6b8b82009a6',
        real_time: '4802f8b8ac844743b3229e19e246e834',
        line_data: '00b60d61652548248190f7be606d63f2',
        locations: '95d5bdfff9344be38c0564e583a58323',
        situation: '539911eb16fd40eb960084b630c626a5',
    };

    private handleResponse(res: Response): Object {
        /**
         * For those with IDE-like functionality it may say that Response has no
         * property "_body", calm down. It doesn't know that a response won't have that property
         * which is why it complains. We, however, do know that it will.
         */
        var data = JSON.parse(res._body).ResponseData;
        return data;
    }

    getDeviations(data?: Deviations): Promise<any> {
        if (!data) data = new Deviations();
        let url = this.urls.deviations;
        data.setKey(this.apiKeys.deviations);

        return this.sendGet(url, data.getRequestOptions()).then(response => {
            return new Promise((resolve, reject) => {
                resolve(this.handleResponse(response));
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                console.error(error);
                reject(error);
            });
        });
    }

    getRealtime(data: RealtimeInfo): Promise<any> {
        // Enforce RealtimeInfo object because the request requires certain properties.
        if (!data) {
            console.error("Function 'getRealtime' requires a RealtimeInfo object\nRequired properties: ['SiteId', 'TimeWindow']");
            return;
        }
        data.setKey(this.apiKeys.real_time);
        let url: string = this.urls.real_time;

        return this.sendGet(url, data.getRequestOptions()).then(response => {
            return new Promise((resolve, reject) => {
                resolve(this.handleResponse(response));
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                console.log(error);
                reject(error);
            });
        });
    }

    getLineData(data: LineData): Promise<any> {
        if (!data) {
            console.error("Function 'getLineData' requires a LineData object\nRequired properties: ['model']");
            return;
        }
        let url: string = this.urls.line_data;
        data.setKey(this.apiKeys.line_data);
        return this.sendGet(url, data.getRequestOptions()).then(response => {
            return new Promise((resolve, reject) => {
                resolve(this.handleResponse(response));
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                console.error(error);
                reject(error);
            });
        });
    }

    getLocations(data: Location): Promise<any> {
        if (!data) {
            console.error("Function 'getLocations' requires a Location object\nRequired properties: ['query']");
            return;
        }
        let url: string = this.urls.locations;
        data.setKey(this.apiKeys.locations);

        return this.sendGet(url, data.getRequestOptions()).then(response => {
            return new Promise((resolve, reject) => {
                resolve(this.handleResponse(response));
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                console.error(error);
                reject(error);
            });
        });
    }

    getSituation(data: Situation) {
        if (!data) data = new Situation();
        let url: string = this.urls.situation;
        data.setKey(this.apiKeys.situation);

        return this.sendGet(url, data.getRequestOptions()).then(response => {
            return new Promise((resolve, reject) => {
                resolve(this.handleResponse(response));
            });
        }).catch(error => {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        });
    }

    sendGet(url: string, options: RequestOptions): Promise<Response> {
        return this.http.get(url, options).toPromise();
    }
}
