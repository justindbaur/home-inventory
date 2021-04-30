import { AxiosResponse } from "axios";
import { API_URL, ServiceBase } from "./ServiceBase";


export class AccountService extends ServiceBase {
    constructor() {
        super(API_URL)

    }

    signIn(username: string, password: string): Promise<AxiosResponse> {
        var basicToken = btoa(`${username}:${password}`);

        return this.client.post("AccountSvc/SignIn", null, {
            headers: {
                'Authorization': `Basic ${basicToken}`
            }
        });

        // TODO: Maybe save token?
    }
}