<script lang="ts">
  import { onMount } from "svelte";
  import CartItem from "./cart_item.svelte";
  import { goto } from "$app/navigation";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  import TextAreaInput from "../components/inputs/text_area_input.svelte";
  import { cartRepo, dishRepo, orderRepo } from "$lib/app/defaults";
  import TgBackButton from "../components/tg_back_button.svelte";
  import TgMainButton from "../components/tg_main_button.svelte";

  let dishes: any[] = $state([]);
  let total = $state(0);
  let wishes = $state("");

  onMount(async () => {
    cartRepo.loadCart();
    let cartItems = cartRepo.get();
    let dishesIds: any[] = [];
    cartItems.forEach((v, k) => {
      if (v == undefined || k == undefined || v == 0) return;
      dishesIds.push(k);
    });

    dishes = await dishRepo.getByIds(dishesIds);
    let exists = [];
    dishesIds.forEach((id) => {
      let found = dishesIds.findIndex((dish) => dish.id == id) == -1;
      if (!found) {
        cartRepo.setDishCount(id, 0);
        return;
      }
      exists.push(id);
    });

    dishes.forEach((dish) => {
      let count = cartItems.get(dish.id.toString());
      if (!count) {
        return;
      }
      total += dish.price * count;
    });
  });

  let isEnabled = $state(true);

  const processOrder = async () => {
    isEnabled = false;
    const items = cartRepo.getAsObjects();
    const result = await orderRepo.process(items, wishes);
    isEnabled = true;
    if (!result) {
      return;
    }
    cartRepo.clear();
    goto("/", { replaceState: true });
  };
</script>

<TgBackButton
  onclick={() => {
    goto("/dishes");
  }}
/>

<TgMainButton label="Перейти к оплате" bind:isEnabled onclick={processOrder} />

<main class="space-y-8 px-4 py-6 text-gray-800 dark:text-gray-100">
  <h3 class="text-center text-2xl font-semibold">Корзина</h3>
  <section class="space-y-4">
    {#each dishes as _, i}
      <CartItem
        bind:dish={dishes[i]}
        count={cartRepo.getDishCount(dishes[i].id)}
      />
    {/each}
  </section>

  <section
    class="flex justify-between items-center text-gray-700 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md"
  >
    <div class="text-lg font-medium">Итого:</div>
    <div class="text-xl font-bold text-right">{FormatPriceDefault(total)}</div>
  </section>

  <section class="wishes">
    <TextAreaInput bind:value={wishes} label="Пожелания" />
  </section>
</main>
