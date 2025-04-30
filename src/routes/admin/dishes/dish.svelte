<script lang="ts">
  import { dishRepo } from "$lib/app/defaults";
  import DeleteModal from "$lib/components/delete_modal.svelte";
  import PreviewImage from "$lib/components/preview_image.svelte";
  import type { Dish } from "$lib/types/dish";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  import { Button } from "flowbite-svelte";
  import { Section } from "flowbite-svelte-blocks";

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
</script>

<Section name="content">
  <div
    class="bg-white dark:bg-gray-700 shadow rounded-lg p-4 m-2 flex flex-col items-center"
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

    <div class="flex gap-1 flex-wrap flex-col">
      <Button color="red" onclick={() => (openDeleteModal = true)}>
        Удалить
      </Button>
      <Button
        color="primary"
        onclick={() => {
          onEvent(dish, "edit");
        }}
      >
        Редактировать
      </Button>
    </div>
  </div>
</Section>

<DeleteModal
  DeleteText={`Вы уверены, что хотите удалить ${dish.name} блюдо?`}
  bind:openModal={openDeleteModal}
  HandleDelete={deleteDish}
  HandleCancel={() => {}}
/>
