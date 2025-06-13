import type { DishCategory } from "$lib/types/dish_category"
import type { Client } from "$lib/utils/client"

const allDishesCategoriesEndpoint = '/dishes/all_categories'
const dishesCategoriesEndpoint = '/dishes/categories'

export interface IAuthRepo {
    getAccessToken(): Promise<string>
}

export class DishCategoryRepository {
    public constructor(private cli: Client) { }

    public async getAll(): Promise<DishCategory[]> {
        return await this.cli.request()
            .setEndpoint(allDishesCategoriesEndpoint)
            .send()
            .then(response => response.json())
    }

    public async get(): Promise<DishCategory[]> {
        return await this.cli.request()
            .setEndpoint(dishesCategoriesEndpoint)
            .send()
            .then(response => response.json())
    }

    public async getById(categoryId: number): Promise<DishCategory[]> {
        return await this.cli.request().
            setEndpoint(dishesCategoriesEndpoint + '/' + categoryId)
            .send()
            .then(response => response.json())
    }

    public async add(name: string): Promise<DishCategory> {
        return await this.cli.request()
            .setMethod("POST")
            .setEndpoint(dishesCategoriesEndpoint)
            .setJSONBody({ "name": name })
            .auth()
            .send()
            .then(response => response.json())
    }

    public async rename(categoryId: number, newName: string): Promise<boolean> {
        return await this.cli.request()
            .setMethod("POST")
            .setEndpoint(dishesCategoriesEndpoint + '/' + categoryId)
            .setJSONBody({ "name": newName })
            .auth()
            .send()
            .then(r => r.ok)
    }

    public async delete(categoryId: number): Promise<boolean> {
        return await this.cli.request()
            .setMethod("DELETE")
            .setEndpoint(dishesCategoriesEndpoint + '/' + categoryId)
            .auth()
            .send()
            .then(r => r.ok)
    }
}