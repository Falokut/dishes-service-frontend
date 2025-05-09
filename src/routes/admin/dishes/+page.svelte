<script lang="ts">
  import Dish from "./dish.svelte";
  import TgBackButton from "../../components/tg_back_button.svelte";
  import CategoriesList from "../../components/categories_list.svelte";
  import DishesGrid from "../../components/dishes_grid.svelte";
  import { Section } from "flowbite-svelte-blocks";
  import TgMainButton from "../../components/tg_main_button.svelte";
  import DishModal from "./dish_modal.svelte";
  import { ToBase64 } from "$lib/utils/base64";
  import { dishRepo } from "$lib/app/defaults";
  import type { EditDishRequest } from "$lib/types/edit_dish";
  import type { ModalInput } from "./modal_input";
  import type { Dish as DishDto } from "$lib/types/dish";

  let dishesGrid: DishesGrid;
  let selectedDish = $state<DishDto>();
  let categoriesList: CategoriesList;

  let addModal: DishModal;
  let editModal: DishModal;

  const onEvent = (d: DishDto, event: string) => {
    selectedDish = d;
    switch (event) {
      case "edit":
        const editInitInput = {
          name: selectedDish.name,
          categoriesIds: [],
          categoriesNames: selectedDish.categories,
          price: selectedDish.price,
          url: "",
          image: File.prototype,
          restaurantId: 0,
          restaurantName: selectedDish.restaurantName,
        };
        editModal.OpenModal(editInitInput);
        mainButtonVisible = false;
        break;
    }
  };

  let mainButtonVisible = $state(true);

  const onCancel = () => {
    mainButtonVisible = true;
  };
</script>

<TgBackButton />
<TgMainButton
  label="Добавить блюдо"
  onclick={() => {
    addModal.OpenModal(null);
    mainButtonVisible = false;
  }}
  bind:visible={mainButtonVisible}
/>

<Section name="content">
  <CategoriesList
    bind:this={categoriesList}
    onCategoryChanged={(s: number) => {
      dishesGrid.selectedCategoryUpdated(s);
    }}
  />
  <DishesGrid
    pageLimit={10}
    DishComponent={Dish}
    bind:this={dishesGrid}
    {onEvent}
  />
</Section>

<DishModal
  bind:this={addModal}
  submitText="Добавить"
  title="Добавить блюдо"
  {onCancel}
  onSubmit={async (input: ModalInput) => {
    if (!input) return;

    const req = {
      name: input.name,
      categories: input.categoriesIds,
      price: input.price,
      image: null,
      restaurantId: input.restaurantId,
    };

    if (input.image?.size > 0) {
      req.image = await ToBase64(input.image);
    }

    const success = await dishRepo.add(req);
    if (success) {
      dishesGrid.addedDish();
      categoriesList.FetchDishCategories();
    }
    mainButtonVisible = true;
  }}
/>

<DishModal
  bind:this={editModal}
  submitText="Обновить"
  title="Редактировать блюдо"
  {onCancel}
  onSubmit={async (input: ModalInput) => {
    if (!selectedDish || !input) return;

    const req: EditDishRequest = {
      id: selectedDish.id,
      name: input.name,
      categories: input.categoriesIds,
      price: input.price,
      image: null,
      restaurantId: input.restaurantId,
    };

    if (input.image?.size > 0) {
      req.image = await ToBase64(input.image);
    }

    const success = await dishRepo.edit(req);
    if (success) {
      dishesGrid.updatedDish(selectedDish.id);
      categoriesList.FetchDishCategories();
    }
    mainButtonVisible = true;
  }}
/>
