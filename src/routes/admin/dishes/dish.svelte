<script lang="ts">
  import { dishRepo } from "$lib/app/defaults";
  import DeleteModal from "../../components/delete_modal.svelte";
  import PreviewImage from "../../components/preview_image.svelte";
  import type { Dish } from "$lib/types/dish";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  import { Button } from "flowbite-svelte";

  let {
    dish = $bindable<Dish>(),
    onRemove = $bindable((dishId: number) => {}),
    onEvent = $bindable((d: Dish, event: string) => {}),
  } = $props();

  let openDeleteModal = $state(false);

  const deleteDish = async () => {
    await dishRepo.delete(dish.id);
    onRemove(dish.id);
  };

  let deleteText = $state("");
  $effect(() => {
    deleteText = `Вы уверены, что хотите удалить блюдо "${dish.name}"?`;
  });
</script>

<div class="bg-gray-100 dark:bg-gray-700 shadow rounded-lg p-4 m-2 flex flex-col aspect-[3/4]">
  <div class="w-full relative aspect-square mb-4">
    <PreviewImage
      bind:url={dish.url}
      bind:alt={dish.name}
      imgClass="w-full h-full object-cover rounded-md"
    />
  </div>

  <div class="flex flex-col flex-1 justify-between">
    <div class="text-center mb-2 text-base font-medium text-gray-800 dark:text-gray-100">
      <p>{dish.name}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">{FormatPriceDefault(dish.price)}</p>
    </div>

    <div class="flex flex-col gap-2">
      <Button color="red" onclick={() => (openDeleteModal = true)}>
        Удалить
      </Button>
      <Button color="primary" onclick={() => onEvent(dish, "edit")}>
        Редактировать
      </Button>
    </div>
  </div>
</div>

<DeleteModal
  bind:deleteText
  bind:openModal={openDeleteModal}
  HandleDelete={deleteDish}
  HandleCancel={() => {}}
/>
