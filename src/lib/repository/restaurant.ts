import type { Restaurant } from '$lib/types/restaurant'
import { Client } from '../utils/client'

const restaurantsEndpoint = '/restaurants'

export class RestaurantRepository {
    public constructor(private cli: Client) { }

    public async getAll(): Promise<Restaurant[]> {
        return this.cli.request()
            .setEndpoint(restaurantsEndpoint)
            .send()
            .then(r => r.json())
    }

    public async getById(id: number): Promise<Restaurant[]> {
        return this.cli.request()
            .setEndpoint(restaurantsEndpoint + '/' + id)
            .send()
            .then(r => r.json())
    }
    public async add(name: string): Promise<Restaurant> {
        return this.cli.request()
            .setMethod("POST")
            .setEndpoint(restaurantsEndpoint)
            .setJSONBody({ "name": name })
            .auth()
            .send()
            .then(r => r.json())
    }
    public async rename(id: number, name: string): Promise<boolean> {
        return this.cli.request()
            .setMethod("POST")
            .setEndpoint(restaurantsEndpoint + '/' + id)
            .setJSONBody({ "name": name })
            .auth()
            .send()
            .then(r => r.ok)
    }
    public async delete(id: number): Promise<boolean> {
        return this.cli.request()
            .setMethod("DELETE")
            .setEndpoint(restaurantsEndpoint + '/' + id)
            .auth()
            .send()
            .then(r => r.ok)
    }
}


