<script lang="ts">
  let {
    value = $bindable(""),
    label = $bindable(""),
    onchange = $bindable(function () {}),
  } = $props();
</script>

<div class="flex items-center gap-4 w-full text-gray-900 dark:text-gray-200">
  {#if label.length > 0}
    <div class="w-32 font-bold">
      {label}
    </div>
  {/if}
  <input
    id="text-input"
    class="min-w-0 flex-1 px-3 py-2 border bg-gray-300 dark:bg-gray-800 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    bind:value
    {onchange}
  />
</div>
