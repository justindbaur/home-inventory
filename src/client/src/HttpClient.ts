interface HttpResponse<T> extends Response {
    parsedBody?: T
}


export class HttpClient {
    baseUri: string;
    defaultRequestHeaders: HeadersInit;

    static getFullHost(): string {

        // TODO: This might have to be fixed in a different environment
        return window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    }

    constructor(baseUri: string) {
        this.baseUri = baseUri;
        this.defaultRequestHeaders = new Headers();
        this.defaultRequestHeaders.append("Content-Type", "application/json");
        this.defaultRequestHeaders.append("Origin", HttpClient.getFullHost());
        this.defaultRequestHeaders.append("Accept", "application/json");
    }

    async get<T>(requestUri: string): Promise<HttpResponse<T>> {
        const response = await this.simpleSend(requestUri, 'GET');
        return await this.enrich(response);
    }

    async post<T>(requestUri: string, body: any): Promise<HttpResponse<T>> {
        const response = await this.simpleSend(requestUri, 'POST', body);
        return await this.enrich(response);
    }

    async patch<T>(requestUri: string, body: any): Promise<HttpResponse<T>> {
        const response = await this.simpleSend(requestUri, 'PATCH', body);
        return await this.enrich(response);
    }

    delete(requestUri: string): Promise<Response> {
        return this.simpleSend(requestUri, 'DELETE');    
    }

    private async send(input: RequestInfo, init: RequestInit | undefined): Promise<Response> {
        const response = fetch(input, init);
        return response;
    }

    private simpleSend(requestUri: string, method: string, body?: any): Promise<Response> {
        if (body === undefined) {
            return this.send(this.fullUri(requestUri), {method: method, headers: this.defaultRequestHeaders});
        }
        else {
            return this.send(this.fullUri(requestUri), {method: method, body: JSON.stringify(body), headers: this.defaultRequestHeaders});
        }
    }

    private async enrich<T>(response: HttpResponse<T>): Promise<HttpResponse<T>> {
        if (response.ok) {
            response.parsedBody = await response.json();
        }

        return response;
    }

    private fullUri(requestUri?: string): string {
        return this.baseUri + requestUri;
    }
}