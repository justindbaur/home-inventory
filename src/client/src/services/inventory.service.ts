import { Part } from "../InventoryTypes";
import { API_URL, ServiceBase } from "./ServiceBase";

export class InventoryService extends ServiceBase {
    constructor() {
        super(API_URL);
    }

    async getParts(): Promise<Part[]> {
        var response = await this.client.get<Part[]>("PartSvc/Parts");
        return response.data;
    }

    async getPart(id: string): Promise<Part> {
        var response = await this.client.get<Part>(`PartSvc/Parts/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log({ statusText: response.statusText, body: response.data});
            throw new Error("Part not found.");
        }
    }
}