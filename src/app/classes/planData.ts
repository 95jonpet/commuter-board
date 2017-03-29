import { RequestTemplate } from './requestTemplate';

export class PlanData extends RequestTemplate {
    originId: number;
    destId: number;

    realtime: boolean = true;
    searchForArrival: number = 0;
    useBus?: boolean;
    useMetro?: boolean;
    useTrain?: boolean;
    useTram?: boolean;
    useShip?: boolean;

    constructor(originId: number, destId: number) {
        super();
        this.originId = originId;
        this.destId = destId;
    }

}
