import type { AddDishRequest } from "$lib/types/add_dish";
import type { Dish } from "$lib/types/dish";
import type { EditDishRequest } from "$lib/types/edit_dish";
import type { Client } from "$lib/utils/client"

const dishesEndpoint = '/dishes'

export class DishRepository {
    public constructor(private cli: Client) { }

    public async getByIds(dishIds: number[]): Promise<Dish[]> {
        const queryParams: Record<string, string> = {};
        queryParams["ids"] = dishIds.join(',');
        return this.cli.request()
            .setEndpoint(dishesEndpoint)
            .setQueryParams(queryParams)
            .send()
            .then(response => response.json());
    }
    public async get(limit: number, offset: number, categoriesIds?: number[]): Promise<Dish[]> {
        const queryParams: Record<string, string> = {};
        queryParams["limit"] = String(limit);
        queryParams["offset"] = String(offset);
        if (categoriesIds && categoriesIds.length > 0) {
            queryParams["categoriesIds"] = categoriesIds.join(',');
        }
        return this.cli.request()
            .setEndpoint(dishesEndpoint)
            .setQueryParams(queryParams)
            .send()
            .then(response => response.json());
    }
    public async add(req: AddDishRequest): Promise<boolean> {
        return this.cli.request()
            .setMethod("POST")
            .setEndpoint(dishesEndpoint)
            .setJSONBody(req)
            .auth()
            .send()
            .then(resp => resp.ok)
    }
    public async delete(id: number): Promise<boolean> {
        return this.cli.request()
            .setMethod("DELETE")
            .setEndpoint(dishesEndpoint + "/delete/" + id)
            .auth()
            .send()
            .then(resp => resp.ok)
    }
    public async edit(dish: EditDishRequest): Promise<boolean> {
        return this.cli.request()
            .setMethod("POST")
            .setEndpoint(dishesEndpoint + "/edit/" + dish.id)
            .setJSONBody(dish)
            .auth()
            .send()
            .then(resp => resp.ok)
    }
}