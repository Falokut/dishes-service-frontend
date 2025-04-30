<script lang="ts">
  import { Modal, Button } from "flowbite-svelte";
  import { dishCategoryRepo, restaurantRepo } from "$lib/app/defaults";
  import MultiSelectInput from "$lib/components/inputs/multi_select_input.svelte";
  import TextInput from "$lib/components/inputs/text_input.svelte";
  import ImageInput from "$lib/components/inputs/image_input.svelte";
  import DishPreview from "$lib/components/dish_preview.svelte";
  import { onMount } from "svelte";
  import { defaultInput, type ModalInput } from "./modal_input";

  let {
    openModal = $bindable(false),
    initInput = $bindable<ModalInput>(defaultInput),
    title = $bindable(""),
    onClose = $bindable(() => {}),
    onSubmit: submitted = $bindable((input: ModalInput) => {}),
    submitText = $bindable(""),
  } = $props();

  let input = $state<ModalInput>(defaultInput);
  let dishPrice = $state("");

  const dishesCategoriesMap = new Map<string, number>();

  let options: any[] = $state([]);
  let restaurants: any[] = $state([]);

  const loadDishesCategories = async () => {
    const categories = await dishCategoryRepo.getAll();
    const opts = categories.map((v: any) => ({
      name: v.name,
      value: v.id,
    }));
    categories.forEach((v: any) => {
      dishesCategoriesMap.set(v.name, v.id);
    });
    return opts;
  };

  onMount(async () => {
    options = await loadDishesCategories();
    restaurants = await restaurantRepo.getAll();
  });

  let prevInitInput: ModalInput | null = null;
  $effect(() => {
    if (
      !initInput ||
      JSON.stringify(initInput) === JSON.stringify(prevInitInput)
    )
      return;

    prevInitInput = { ...initInput };

    input = { ...initInput };
    dishPrice = (input.price / 100).toFixed(2);

    input.categoriesIds = input.categoriesNames
      .map((name) => dishesCategoriesMap.get(name))
      .filter((id): id is number => id !== undefined);

    const restaurant = restaurants.find((r) => r.name === input.restaurantName);
    if (restaurant) {
      input.restaurantId = restaurant.id;
    }
  });

  const isInputValid = (input: any) =>
    input.name && input.url && input.price > 80 && input.restaurantId > 0;

  const submitInput = async () => {
    if (!isInputValid(input)) return;
    submitted(input);
  };
</script>

<Modal
  bind:title
  bind:open={openModal}
  size="lg"
  backdropClass="fixed inset-0 z-40 bg-gray-900/80"
  class="w-full h-screen overflow-y-scroll"
>
  <div class="space-y-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
    <TextInput bind:value={input.name} label="Название:" />
    <TextInput
      bind:value={dishPrice}
      label="Цена:"
      onChange={() => {
        input.price = Math.ceil(Number(dishPrice) * 100);
      }}
    />
    <ImageInput
      bind:outputUrl={input.url}
      label="Картинка:"
      bind:file={input.image}
      uploadLabel="Выбрать файл"
    />
    <div class="flex mt-4 text-gray-700 dark:text-gray-300">
      <div class="w-32 font-bold">Ресторан:</div>
      <div class="flex-1">
        <select
          bind:value={input.restaurantId}
          class="w-full p-2 mt-1 border bg-gray-300 dark:bg-gray-800 border-gray-600 rounded-lg"
        >
          {#each restaurants as restaurant}
            <option value={restaurant.id}>{restaurant.name}</option>
          {/each}
        </select>
      </div>
    </div>

    <MultiSelectInput
      bind:options
      label="Категории:"
      bind:selected={input.categoriesIds}
    />

    {#if isInputValid(input)}
      <div class="pt-6">
        <h3 class="text-center text-xl font-semibold mb-2">Предосмотр</h3>
        <DishPreview bind:dish={input} />
      </div>
    {/if}

    <div class="mt-4 flex justify-center gap-4">
      <Button color="light" on:click={() => (openModal = false)}>Отмена</Button>
      <Button color="green" on:click={submitInput}>
        {submitText}
      </Button>
    </div>
  </div>
</Modal>
