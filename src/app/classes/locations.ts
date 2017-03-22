import { RequestTemplate } from './requestTemplate';

export class Location extends RequestTemplate {
    stationsOnly?: boolean;
    maxResults?: number;

    constructor(private query: string) {super()};
}
