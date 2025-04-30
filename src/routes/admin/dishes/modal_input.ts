export interface ModalInput {
    name: string;
    categoriesIds: number[];
    categoriesNames: string[];
    price: number;
    url: string;
    image: File;
    restaurantId: number;
    restaurantName: string;
}

export const defaultInput: ModalInput = {
    name: "",
    categoriesIds: [],
    categoriesNames: [],
    price: 0,
    url: "",
    image: File.prototype,
    restaurantId: 0,
    restaurantName: "",
};