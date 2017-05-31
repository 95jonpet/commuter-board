import { Departure } from './departure';
import { SLHttpService } from '../http.service';

export class Station {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

}
