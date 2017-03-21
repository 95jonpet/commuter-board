import { RequestTemplate } from './requestTemplate';

export class RealtimeInfo extends RequestTemplate {
    SiteId: number;
    TimeWindow: number;
    Bus?: boolean;
    Metro?: boolean;
    Train?: boolean;
    Tram?: boolean;
    Ship?: boolean;

    constructor(siteId: number, timeWindow: number) {
        super();
        this.SiteId = siteId;
        this.TimeWindow = timeWindow;
    }

}
