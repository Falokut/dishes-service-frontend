<script lang="ts">
  import { dishCategoryRepo } from "$lib/app/defaults";
  import DeleteModal from "../../components/delete_modal.svelte";
  import TextInput from "../../components/inputs/text_input.svelte";
  import type { DishCategory } from "$lib/types/dish_category";
  import ApproveModal from "../../components/approve_modal.svelte";

  let {
    category = $bindable<DishCategory>(),
    remove = $bindable<(id: number) => void>(),
  } = $props();

  async function updateCategory() {
    await dishCategoryRepo.rename(category.id, inputCategoryName);
    category.Name = inputCategoryName;
  }

  async function deleteCategory() {
    await dishCategoryRepo.delete(category.id);
    remove(category.id);
  }

  let openDeleteModal = $state(false);
  let deleteText = $state("");

  let openApproveModal = $state(false);
  let approveText = $state("");
  let inputCategoryName = $state(category.name);
  $effect(() => {
    deleteText = `Вы уверены, что хотите удалить категорию "${category.name}"?`;
    approveText= `Вы уверены, что хотите поменять название категории "${category.name}" на "${inputCategoryName}"?`;
  });
</script>

<section
  class="flex items-center justify-between gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 w-full"
>
  <div class="max-w-2/3">
    <TextInput bind:value={inputCategoryName} />
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
  HandleDelete={deleteCategory}
/>

<ApproveModal
  bind:approveText
  bind:openModal={openApproveModal}
  HandleApprove={updateCategory}
/>
