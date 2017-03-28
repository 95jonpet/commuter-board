import { RequestTemplate } from './requestTemplate';

export class LineData extends RequestTemplate {

    constructor(private model: string) {
        super();
        let validModels: Array<string> = ["site", "stop", "line", "jour", "tran"];
        if (validModels.indexOf(model) < 0) {
            console.error("Invalid model value: '"+model+"'. Valid values:\n", validModels);
            this.model = null;
            throw "InvalidArgument";
        }
    };
}
