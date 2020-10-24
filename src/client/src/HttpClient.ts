interface HttpResponse<T> extends Response {
    parsedBody?: T
}


export class HttpClient {
    baseUri: string;

    static getFullHost(): string {
        return window.location.protocol + "//" + window.location.hostname;
    }

    constructor(baseUri: string) {
        this.baseUri = baseUri;
    }

    async get<T>(requestUri: string): Promise<HttpResponse<T>> {
        const response: HttpResponse<T> = await this.http(requestUri).then(r => {
            console.log(r);
            return r;
        });

        console.log(response);
        if (response.ok) {
            response.parsedBody = await response.json();
        }

        return response;
    }

    async post<T>(requestUri: string, body: any): Promise<HttpResponse<T>> {
        const request = this.getRequestInit();
        request.body = JSON.stringify(body);
        const response: HttpResponse<T> = await fetch(this.fullUri(requestUri), request);
        
        if (response.ok) {
            response.parsedBody = await response.json();
        }

        return response;
    }

    private http(requestUri?: string): Promise<Response> {
        return fetch(this.fullUri(requestUri), this.getRequestInit());
    }

    private fullUri(requestUri?: string): string {
        return this.baseUri + requestUri;
    }

    private getRequestInit(): RequestInit {
        return { headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:3000/', 'Accept': 'application/json' } };
    }
}