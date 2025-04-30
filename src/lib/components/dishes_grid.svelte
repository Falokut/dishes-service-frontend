<script lang="ts">
  import { onMount } from "svelte";
  import { Paginator } from "$lib/utils/paginator.svelte";
  import { dishRepo } from "$lib/app/defaults";
  import type { Dish as DishDto } from "$lib/types/dish";
  import Dish from "../../routes/dishes/dish.svelte";

  let {
    pageLimit = 10,
    DishComponent,
    onEvent = $bindable((d: Dish, event: string) => {}),
  } = $props();
  let page = $state(1);
  let selectedCategory = -1;

  let dishes: DishDto[] = $state([]);

  const fetchDishes = async (limit: number, offset: number) => {
    return dishRepo.get(
      limit,
      offset,
      selectedCategory != -1 ? [selectedCategory] : []
    );
  };
  let paginator = new Paginator(fetchDishes);

  const updateDishes = async () => {
    await paginator.getPageData(page, pageLimit, true);
    dishes = paginator.GetAllData();
  };

  export function selectedCategoryUpdated(newSelectedCategory: number) {
    if (newSelectedCategory == selectedCategory) return;

    selectedCategory = newSelectedCategory;
    page = 1;
    updateDishes();
  }

  export function addedDish() {
    if (!paginator.canLoadMore) {
      updateDishes();
    } else {
      page++;
      updateDishes();
    }
  }

  export async function updatedDish(id: number) {
    const index = dishes.findIndex((dish) => dish.id === id);

    if (index !== -1) {
      const gettedDishes = await dishRepo.getByIds([id]);
      if (gettedDishes.length) dishes[index] = gettedDishes[0];
    }
  }

  onMount(() => {
    updateDishes();
    window.addEventListener("scroll", handleScroll);
  });

  let container: any;
  function handleScroll() {
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      paginator.canLoadMore
    ) {
      page++;
      paginator.getPageData(page, pageLimit, false);
      dishes = paginator.GetAllData();
    }
  }
</script>

<div
  bind:this={container}
  class="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
>
  {#each dishes as _, i}
    <DishComponent
      bind:dish={dishes[i]}
      onRemove={(dishId: number) => {
        dishes = dishes.filter((v) => v.id != dishId);
      }}
      {onEvent}
    />
  {/each}
</div>
