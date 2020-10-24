interface HttpResponse<T> extends Response {
    parsedBody?: T
}


export class HttpClient {
    baseUri: string;

    static getFullHost(): string {

        // TODO: This might have to be fixed in a different environment
        return window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    }

    constructor(baseUri: string) {
        this.baseUri = baseUri;
    }

    async get<T>(requestUri: string): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await this.http(requestUri);
        if (response.ok) {
            response.parsedBody = await response.json();
        }

        return response;
    }

    async post<T>(requestUri: string, body: any): Promise<HttpResponse<T>> {
        const request = this.getRequestInit();
        request.method = 'POST';
        request.body = JSON.stringify(body);
        const response: HttpResponse<T> = await fetch(this.fullUri(requestUri), request);
        
        if (response.ok) {
            response.parsedBody = await response.json();
        }

        return response;
    }

    async patch<T>(requestUri: string, body: any): Promise<HttpResponse<T>> {
        const request = this.getRequestInit();
        request.method = 'PATCH';
        request.body = JSON.stringify(body);
        const response: HttpResponse<T> = await fetch(this.fullUri(requestUri), request);

        if (response.ok) {
            response.parsedBody = await response.json();
        }

        return response;
    }

    async send(request: Request): Promise<Response> {
        console.log(request);
        const response = fetch(request);
        console.log(response);
        return response;
    }

    private http(requestUri?: string): Promise<Response> {
        return fetch(this.fullUri(requestUri), this.getRequestInit());
    }

    private fullUri(requestUri?: string): string {
        return this.baseUri + requestUri;
    }

    private getRequestInit(): RequestInit {
        return { headers: { 'Content-Type': 'application/json', 'Origin': HttpClient.getFullHost(), 'Accept': 'application/json' } };
    }
}