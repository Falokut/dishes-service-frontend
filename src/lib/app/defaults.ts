import { CartRepository } from "$lib/repository/cart";
import { DishRepository } from "$lib/repository/dish";
import { DishCategoryRepository } from "$lib/repository/dish_category";
import { RestaurantRepository } from "$lib/repository/restaurant";
import { Client } from "$lib/utils/client";
import { env } from '$env/dynamic/public';
import { OrderRepository } from "$lib/repository/order";
import { AuthRepository } from "$lib/repository/auth";

const apiPath = env.PUBLIC_API_PATH ?? "";
export const defaultClient = new Client(apiPath);

export const dishRepo = new DishRepository(defaultClient);
export const authRepo = new AuthRepository(defaultClient);
export const dishCategoryRepo = new DishCategoryRepository(defaultClient);
export const restaurantRepo = new RestaurantRepository(defaultClient);
export const orderRepo = new OrderRepository(defaultClient);
export const cartRepo = new CartRepository();
