<script lang="ts">
  import Dish from "./dish.svelte";
  import TgBackButton from "$lib/components/tg_back_button.svelte";
  import CategoriesList from "$lib/components/categories_list.svelte";
  import DishesGrid from "$lib/components/dishes_grid.svelte";
  import { Section } from "flowbite-svelte-blocks";
  import TgMainButton from "$lib/components/tg_main_button.svelte";
  import DishModal from "./dish_modal.svelte";
  import { ToBase64 } from "$lib/utils/base64";
  import { dishRepo } from "$lib/app/defaults";
  import type { EditDishRequest } from "$lib/types/edit_dish";
  import { defaultInput, type ModalInput } from "./modal_input";
  import type { Dish as DishDto } from "$lib/types/dish";

  let dishesGrid: DishesGrid;
  let openAddModal = $state(false);
  let openEditModal = $state(false);
  let selectedDish = $state<DishDto>();

  let editInitInput = $state<ModalInput>(defaultInput);

  const onEvent = (d: DishDto, event: string) => {
    selectedDish = d;
    switch (event) {
      case "edit":
        editInitInput = {
          name: selectedDish.name,
          categoriesIds: [],
          categoriesNames: selectedDish.categories,
          price: selectedDish.price,
          url: "",
          image: File.prototype,
          restaurantId: 0,
          restaurantName: selectedDish.restaurantName,
        };
        openEditModal = true;
        break;
    }
  };

  let mainButtonVisible = $state(true);
  $effect(() => {
    mainButtonVisible = !openAddModal && !openEditModal;
  });
</script>

<TgBackButton />
<TgMainButton
  label="Добавить блюдо"
  onclick={() => (openAddModal = true)}
  bind:visible={mainButtonVisible}
/>

<Section name="content">
  <CategoriesList
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
  bind:openModal={openAddModal}
  submitText="Добавить"
  title="Добавить блюдо"
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
    }
    openAddModal = false;
  }}
></DishModal>

<DishModal
  bind:openModal={openEditModal}
  bind:initInput={editInitInput}
  submitText="Обновить"
  title="Редактировать блюдо"
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
    if (success) dishesGrid.updatedDish(selectedDish.id);
    openEditModal = false;
  }}
></DishModal>
