<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import Dish from "./dish.svelte";
  import DishesGrid from "../components/dishes_grid.svelte";
  import CategoriesList from "..//components/categories_list.svelte";
  import { cartRepo } from "$lib/app/defaults";
  import TgMainButton from "../components/tg_main_button.svelte";
  import TgBackButton from "../components/tg_back_button.svelte";

  let dishesGrid: DishesGrid;
  let visible = $state(true);
  onMount(() => {
    cartRepo.loadCart();
  });
  $effect(() => {
    visible = cartRepo.get().size > 0;
  });
</script>

<TgMainButton
  label={"Корзина"}
  bind:visible
  isEnabled={true}
  onclick={() => {
    goto("/cart");
  }}
/>

<TgBackButton
  onclick={() => {
    goto("/", { replaceState: true });
  }}
/>

<main class="dish">
  <CategoriesList
    onCategoryChanged={(selectedCategory: number) => {
      dishesGrid.selectedCategoryUpdated(selectedCategory);
    }}
  />
  <DishesGrid pageLimit={10} DishComponent={Dish} bind:this={dishesGrid} />
</main>
