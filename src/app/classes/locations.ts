import { RequestTemplate } from './requestTemplate';

export class Location extends RequestTemplate {
    stationsOnly?: boolean;

    /**
     * Location class to handle location-related requests
     * @param {string}    private SearchString [Query to search for]
     * @param {number=10} private maxResults [Maxresult is set to 10 because it's the default number if none is given]
     */
    constructor(private SearchString: string, private maxResults: number = 10) {super()};
}
