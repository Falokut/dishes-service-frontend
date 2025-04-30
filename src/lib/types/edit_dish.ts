export interface EditDishRequest {
    id: number
    name: string
    price: number
    categories: number[]
    image: any
    restaurantId: number
}