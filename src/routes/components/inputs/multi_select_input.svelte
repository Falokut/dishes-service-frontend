<script lang="ts">
  import { MultiSelect } from "flowbite-svelte";

  let {
    selected = $bindable([]),
    options = $bindable([]),
    onchange = function () {},
    label = $bindable(""),
  } = $props();
</script>

<div class="flex items-center gap-4 text-gray-900 dark:text-gray-200">
  {#if label.length > 0}
    <div class="w-32 font-bold">
      {label}
    </div>
  {/if}
  <div
    class="flex-1 border bg-gray-300 dark:bg-gray-800 border-gray-600 rounded-lg"
  >
    <MultiSelect
      bind:items={options}
      bind:value={selected}
      {onchange}
      placeholder="Выберите..."
    />
  </div>
</div>
