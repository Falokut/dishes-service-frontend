<script>
  let { value = $bindable(), label = $bindable("") } = $props();
</script>

<div class="textarea-container space-y-2">
  <div class="textarea-label text-gray-900 dark:text-gray-200 font-semibold">
    {label}
  </div>
  <textarea
    class="textarea-box w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
    bind:value
    rows="4"
  ></textarea>
</div>
