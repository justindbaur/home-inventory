import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useHistory } from 'react-router';

export const API_URL = "https://localhost:5001/api/"

export abstract class ServiceBase {
    constructor(baseURL: string) {
        this._client = axios.create({
            baseURL: baseURL,
            withCredentials: true
        });

        this._client.interceptors.response.use(this.handleResponse);
        this._client.interceptors.request.use(this.logRequest);
    }

    private _client: AxiosInstance;

    public get client(): AxiosInstance {
        return this._client;
    }
    
    private handleResponse(response: AxiosResponse): AxiosResponse {
        console.log(response);
        
        if (response.status === 401) {
            // Send to login page
            console.log("Unauthorized");
            useHistory().push('/login');
        }

        return response;
    }

    private logRequest(requestConfig: AxiosRequestConfig): AxiosRequestConfig {
        console.log(requestConfig);
        return requestConfig;
    }
}