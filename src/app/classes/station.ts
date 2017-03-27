import { Departure } from './departure';
import { SLHttpService } from '../http.service';

export class Station {
    id: number;
    name: String;

    constructor(id: number, name: String) {
        this.id = id;
        this.name = name;
    }

}