const cartKey = "cart";

type CartChangeListener = (cart: Map<string, number>) => void;

export class CartRepository {
    private cart: Map<string, number> = new Map<string, number>();
    private listeners: Set<CartChangeListener> = new Set();

    public constructor() { }

    public get(): Map<string, number> {
        return this.cart;
    }

    public getAsObjects(): Object {
        return Object.fromEntries(this.cart);
    }

    public getDishCount(dishId: number): number {
        return this.cart.get(dishId.toString()) ?? 0;
    }

    public clear(): void {
        this.cart.clear();
        localStorage.removeItem(cartKey);
        this.notify();
    }

    public setDishCount(dishId: number, count: number): void {
        count = Math.max(0, count);
        if (count === 0) {
            this.cart.delete(dishId.toString());
        } else {
            this.cart.set(dishId.toString(), count);
        }
        this.saveCart();
        this.notify();
    }

    private saveCart(): void {
        localStorage.setItem(cartKey, JSON.stringify(Object.fromEntries(this.cart)));
    }

    public loadCart(): void {
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
                this.notify();
            }
        } catch {
            // ignore error
        }
    }

    public onChange(listener: CartChangeListener): () => void {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notify(): void {
        for (const listener of this.listeners) {
            listener(new Map(this.cart));
        }
    }
}
