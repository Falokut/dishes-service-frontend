<script lang="ts">
  import { restaurantRepo } from "$lib/app/defaults";
  import DeleteModal from "$lib/components/delete_modal.svelte";
  import TextInput from "$lib/components/inputs/text_input.svelte";
  import type { Restaurant } from "$lib/types/restaurant";

  let {
    restaurant = $bindable<Restaurant>(),
    remove = $bindable((id: number) => {}),
  } = $props();

  let openModal = $state(false);

  async function updateRestaurant() {
    await restaurantRepo.rename(restaurant.id, restaurant.name);
  }

  async function deleteRestaurant() {
    await restaurantRepo.delete(restaurant.id);
    remove(restaurant.id);
  }
</script>

<section
  class="flex items-center justify-between gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700"
>
  <TextInput bind:value={restaurant.name} />
  <div class="flex gap-2">
    <button
      class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
      onclick={updateRestaurant}
    >
      ✓
    </button>
    <button
      class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
      onclick={() => (openModal = true)}
    >
      ✕
    </button>
  </div>
</section>

<DeleteModal
  DeleteText={`Вы уверены, что хотите удалить ресторан "${restaurant.name}"?`}
  bind:openModal
  HandleDelete={deleteRestaurant}
  HandleCancel={() => {}}
/>
