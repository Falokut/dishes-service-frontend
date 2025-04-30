import type { UserOrder } from '$lib/types/user_order';
import { Client } from '../utils/client'

const processOrderEndpoint = '/orders'
const userOrdersEndpoint = "/orders/my"

export class OrderRepository {
    public constructor(private cli: Client) { }

    public async process(items: any, wishes: string): Promise<boolean> {
        let req = {
            paymentMethod: "telegram",
            wishes: wishes,
            items: items,
        }
        return this.cli.request()
            .setMethod("POST")
            .setEndpoint(processOrderEndpoint)
            .setJSONBody(req)
            .auth()
            .send()
            .then(r => r.ok)
    }
    public async my(limit: number, offset: number): Promise<UserOrder[]> {
        const queryParams: Record<string, string> = { "limit": String(limit), "offset": String(offset) };
        console.log(this)
        return this.cli.request()
            .setEndpoint(userOrdersEndpoint)
            .setQueryParams(queryParams)
            .auth()
            .send()
            .then(r => r.json())
    }
}