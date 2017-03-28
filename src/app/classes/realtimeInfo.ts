import { RequestTemplate } from './requestTemplate';

export class RealtimeInfo extends RequestTemplate {
    Bus?: boolean;
    Metro?: boolean;
    Train?: boolean;
    Tram?: boolean;
    Ship?: boolean;

    constructor(private SiteId: number, private TimeWindow?: number) {
        super();
        this.TimeWindow = TimeWindow || 30;
    }

}
