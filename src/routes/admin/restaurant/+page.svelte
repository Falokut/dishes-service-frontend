<script lang="ts">
  import { onMount } from "svelte";
  import Row from "./row.svelte";
  import { restaurantRepo } from "$lib/app/defaults";
  import type { Restaurant } from "$lib/types/restaurant";
  import TgBackButton from "$lib/components/tg_back_button.svelte";
  import TgMainButton from "$lib/components/tg_main_button.svelte";
  import { Button, Modal } from "flowbite-svelte";

  let restaurants: Restaurant[] = $state([]);

  onMount(async () => {
    restaurants = await restaurantRepo.getAll();
  });

  function remove(id: number) {
    restaurants = restaurants.filter((v) => v.id !== id);
  }
  let openModal = $state(false);
  let restaurantName = $state("");

  async function addDishCategory() {
    if (!restaurantName.trim()) return;
    const newCategory = await restaurantRepo.add(restaurantName.trim());
    if (newCategory?.id !== undefined) {
      newCategory.name = restaurantName;
      restaurants = [...restaurants, newCategory];
      restaurantName = "";
      openModal = false;
    }
  }

  let mainButtonVisible = $state(true);
  $effect(() => {
    mainButtonVisible = !openModal;
  });
</script>

<TgMainButton
  label="Добавить"
  bind:visible={mainButtonVisible}
  onclick={() => (openModal = true)}
/>
<TgBackButton />

<main class="max-w-3xl mx-auto p-4 space-y-6 text-gray-700 dark:text-gray-100">
  <h3 class="text-center text-2xl font-semibold">Рестораны</h3>

  <div
    class="flex flex-col gap-4 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
  >
    {#each restaurants as restaurant (restaurant.id)}
      <Row {restaurant} {remove} />
    {/each}
  </div>
</main>

<Modal
  bind:open={openModal}
  title="Добавить ресторан"
  autoclose
  backdropClass="fixed inset-0 z-40 bg-gray-900/80"
  size="md"
>
  <div class="p-4 space-y-4">
    <input
      type="text"
      bind:value={restaurantName}
      placeholder="Новый ресторан"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div class="flex justify-end gap-3 pt-4">
      <Button color="light" on:click={() => (openModal = false)}>Отмена</Button>
      <Button color="blue" on:click={addDishCategory}>Добавить</Button>
    </div>
  </div>
</Modal>
