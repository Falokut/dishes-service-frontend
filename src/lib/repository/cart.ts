const cartKey = "cart";

export class CartRepository {
    private cart: Map<string, number> = new Map<string, number>();

    public constructor() { }

    public get(): Map<string, number> {
        return this.cart;
    }

    public getAsObjects(): Object {
        return Object.fromEntries(this.cart)
    }

    public getDishCount(dishId: number): number {
        const count = this.cart.get(dishId.toString());
        return count ?? 0;
    }

    public clear(): void {
        this.cart.clear();
        localStorage.removeItem(cartKey);
    }

    public setDishCount(dishId: number, count: number): void {
        count = Math.max(0, count);
        if (count === 0) {
            this.cart.delete(dishId.toString());
        } else {
            this.cart.set(dishId.toString(), count);
        }
        this.saveCart();
    }

    private saveCart(): void {
        localStorage.setItem(cartKey, JSON.stringify(Object.fromEntries(this.cart)));
    }

    public loadCart() {
        const localCart = localStorage.getItem(cartKey);
        if (localCart == null) {
            return;
        }
        try {
            const parsed = JSON.parse(localCart);
            if (typeof parsed === 'object' && parsed !== null) {
                const entries: [string, number][] = Object.entries(parsed).filter(
                    ([_, value]) => typeof value === 'number'
                ) as [string, number][];
                this.cart = new Map(entries);
            }
        } catch {
            // ignore error
        }
    }
}