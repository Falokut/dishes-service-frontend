<script lang="ts">
  import { onMount } from "svelte";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  import type { Dish } from "$lib/types/dish";

  let { dish = $bindable<Dish>(), count = $bindable<number>(0) } = $props();

  let price = $state(0);
  onMount(() => {
    price = dish.price * count;
  });
</script>

<div
  class="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
>
  <div class="flex flex-col text-gray-700 dark:text-gray-100">
    <span class="text-lg font-medium">{dish.name} x {count}</span>
    <span class="text-sm">{FormatPriceDefault(dish.price)}</span>
  </div>
  <div class="text-lg font-semibold text-right text-gray-600 dark:text-gray-200">
    {FormatPriceDefault(price)}
  </div>
</div>
