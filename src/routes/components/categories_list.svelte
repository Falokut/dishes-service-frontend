<script lang="ts">
  import { dishCategoryRepo } from "$lib/app/defaults";
  import type { DishCategory } from "$lib/types/dish_category";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  let { onCategoryChanged = (categoryId: number) => {} } = $props();

  let categories: DishCategory[] = $state([]);
  let selectedCategory = $state(-1);

  export const FetchDishCategories = async () => {
    categories = await dishCategoryRepo.get();
  };

  onMount(async () => {
    await FetchDishCategories();
  });

  function selectCategory(categoryId: number) {
    selectedCategory = categoryId === selectedCategory ? -1 : categoryId;
    onCategoryChanged(selectedCategory);
  }
</script>

<section class="flex gap-4 overflow-x-auto py-2 px-1 justify-around">
  {#each categories as category}
    <Button
      color={category.id === selectedCategory ? "purple" : "light"}
      outline={category.id !== selectedCategory}
      size="lg"
      on:click={() => selectCategory(category.id)}
      class="whitespace-nowrap"
    >
      {category.name}
    </Button>
  {/each}
</section>
