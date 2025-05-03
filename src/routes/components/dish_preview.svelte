<script lang="ts">
  import PreviewImage from "./preview_image.svelte";
  import type { Dish } from "$lib/types/dish";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  let { dish = $bindable<Dish>() } = $props();
</script>

<div class="flex items-center justify-center">
  <div
    class="w-1/2 sm:w-1/3 lg:w-1/4 bg-gray-100 dark:bg-gray-700 shadow rounded-lg p-4 m-2 flex flex-col items-center"
  >
    <div class="w-full h-fit mb-4 relative">
      <PreviewImage
        bind:url={dish.url}
        bind:alt={dish.name}
        imgClass="w-full h-full object-cover rounded-md"
      />
    </div>

    <div
      class="text-center mb-2 text-base font-medium text-gray-800 dark:text-gray-100"
    >
      <p>{dish.name}</p>
      <p>{FormatPriceDefault(dish.price)}</p>
    </div>
  </div>
</div>
