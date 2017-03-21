import { RequestTemplate } from './requestTemplate';

export class Deviations extends RequestTemplate{
    TransportMode?: string;
    LineNumber?: string;
    SiteId?: number;
    FromDate?: string;
    ToDate?: string;

    constructor() {super();};
}
