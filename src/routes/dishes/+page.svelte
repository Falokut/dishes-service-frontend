<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import Dish from "./dish.svelte";
  import DishesGrid from "$lib/components/dishes_grid.svelte";
  import CategoriesList from "$lib/components/categories_list.svelte";
  import { cartRepo } from "$lib/app/defaults";
  import TgMainButton from "$lib/components/tg_main_button.svelte";
  import TgBackButton from "$lib/components/tg_back_button.svelte";

  let dishesGrid: DishesGrid;
  let visible = $state(true);
  onMount(async () => {
    visible = cartRepo.get().size == 0;
  });
</script>

<TgMainButton
  label={"Корзина"}
  bind:visible
  isEnabled={true}
  onclick={() => {
    goto("/cart");
  }}
></TgMainButton>

<TgBackButton
  onclick={() => {
    goto("/", { replaceState: true });
  }}
></TgBackButton>

<main class="dish">
  <CategoriesList
    onCategoryChanged={(selectedCategory: number) => {
      dishesGrid.selectedCategoryUpdated(selectedCategory);
    }}
  />
  <DishesGrid pageLimit={10} DishComponent={Dish} bind:this={dishesGrid} />
</main>
