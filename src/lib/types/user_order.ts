export interface UserOrder {
    id: string
    items: UserOrderItem[]
    paymentMethod: string
    total: number
    wishes: string
    createdAt: string
    status: string
}

export interface UserOrderItem {
    dishId: number
    name: string
    price: number
    count: number
    totalPrice: number
}