<script lang="ts">
  import { cartRepo } from "$lib/app/defaults";
  import PreviewImage from "$lib/components/preview_image.svelte";
  import type { Dish } from "$lib/types/dish";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  export let dish: Dish;
  let count = 0;
  let showIncrDecrButtons = false;

  function incrDishCount() {
    count = Math.min(count + 1, 40);
    cartRepo.setDishCount(dish.id, count);
  }

  function decrDishCount() {
    count = Math.max(count - 1, 0);
    if (count === 0) showIncrDecrButtons = false;
    cartRepo.setDishCount(dish.id, count);
  }

  onMount(() => {
    count = cartRepo.getDishCount(dish.id);
    if (count > 0) showIncrDecrButtons = true;
  });
</script>

<div
  class="bg-gray-100 dark:bg-gray-700 shadow rounded-lg p-4 m-2 flex flex-col items-center"
>
  <div class="w-full h-fit mb-4 relative">
    <PreviewImage
      bind:url={dish.url}
      bind:alt={dish.name}
      imgClass="w-full h-full object-cover rounded-md"
    />
    {#if count > 0}
      <div
        class="absolute top-0 right-0 bg-orange-500 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm"
      >
        {count}
      </div>
    {/if}
  </div>

  <div class="mt-4 text-center">
    <p class="text-base font-medium text-gray-900 dark:text-white">
      {dish.name}
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-200">
      {FormatPriceDefault(dish.price)}
    </p>
  </div>

  <div class="mt-4 flex justify-center gap-2 w-full">
    {#if showIncrDecrButtons}
      <Button
        color="green"
        class="font-bold py-2 px-4 rounded w-1/2"
        onclick={incrDishCount}
      >
        +
      </Button>
      <Button
        color="red"
        class="font-bold py-2 px-4 rounded w-1/2"
        onclick={decrDishCount}
      >
        -
      </Button>
    {:else}
      <Button
        color="primary"
        class="w-full"
        onclick={() => {
          count = 1;
          showIncrDecrButtons = true;
          cartRepo.setDishCount(dish.id, count);
        }}
      >
        Добавить
      </Button>
    {/if}
  </div>
</div>
