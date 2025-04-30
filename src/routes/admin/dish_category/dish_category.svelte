<script lang="ts">
  import { dishCategoryRepo } from "$lib/app/defaults";
  import TextInput from "$lib/components/inputs/text_input.svelte";
  import type { DishCategory } from "$lib/types/dish_category";

  let {
    category = $bindable<DishCategory>(),
    remove = $bindable<(id: number) => void>(),
  } = $props();

  async function updateCategory() {
    await dishCategoryRepo.rename(category.name, category.id);
  }

  async function deleteCategory() {
    await dishCategoryRepo.delete(category.id);
    remove(category.id);
  }
</script>

<section
  class="flex items-center justify-between gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700"
>
  <TextInput bind:value={category.name} />
  <div class="flex gap-2">
    <button
      class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
      onclick={updateCategory}
    >
      ✓
    </button>
    <button
      class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
      onclick={deleteCategory}
    >
      ✕
    </button>
  </div>
</section>
