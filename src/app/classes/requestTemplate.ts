import { RequestOptions, URLSearchParams, Headers } from '@angular/http';


export class RequestTemplate {
    Key?: string;

    setKey(key: string) {
        this.Key = key;
    }

    /**
     * Creates a RequestOptions object to be used in the API-call
     * @return {RequestOptions}  
     */
    getRequestOptions(): RequestOptions {
        let args: URLSearchParams = new URLSearchParams();
        let options: RequestOptions = new RequestOptions();
        let headers: Headers = new Headers();
        for (var key in this) {
            // This makes sure we only get the defined key-value pair and avoid methods
            if (this.hasOwnProperty(key))
                args.set(key, this[key].toString());
        }
        options.headers = headers;
        options.search = args;
        return options;
    }
}
