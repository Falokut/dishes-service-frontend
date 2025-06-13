<script lang="ts">
  import { restaurantRepo } from "$lib/app/defaults";
  import DeleteModal from "../../components/delete_modal.svelte";
  import TextInput from "../../components/inputs/text_input.svelte";
  import type { Restaurant } from "$lib/types/restaurant";
  import ApproveModal from "../../components/approve_modal.svelte";

  let {
    restaurant = $bindable<Restaurant>(),
    remove = $bindable((id: number) => {}),
  } = $props();

  async function updateRestaurant() {
    await restaurantRepo.rename(restaurant.id, inputRestaurantName);
    restaurant.name = inputRestaurantName;
  }

  async function deleteRestaurant() {
    await restaurantRepo.delete(restaurant.id);
    remove(restaurant.id);
  }

  let openDeleteModal = $state(false);
  let deleteText = $state("");

  let openApproveModal = $state(false);
  let approveText = $state("");
  let inputRestaurantName = $state(restaurant.name);
  $effect(() => {
    deleteText = `Вы уверены, что хотите удалить ресторан "${restaurant.name}"?`;
    approveText= `Вы уверены, что хотите поменять название ресторана "${restaurant.name}" на "${inputRestaurantName}"?`;
  });
</script>

<section
  class="flex items-center justify-between gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 w-full"
>
  <div class="max-w-2/3">
    <TextInput bind:value={inputRestaurantName} />
  </div>
  <div class="flex gap-2">
    <button
      class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
      onclick={() => (openApproveModal = true)}
    >
      ✓
    </button>
    <button
      class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
      onclick={() => (openDeleteModal = true)}
    >
      ✕
    </button>
  </div>
</section>

<DeleteModal
  bind:deleteText
  bind:openModal={openDeleteModal}
  HandleDelete={deleteRestaurant}
/>

<ApproveModal
  bind:approveText
  bind:openModal={openApproveModal}
  HandleApprove={updateRestaurant}
/>
