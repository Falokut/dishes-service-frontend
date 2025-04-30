<script lang="ts">
  import PreviewImage from "$lib/components/preview_image.svelte";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  let { dish = $bindable({}) } = $props();
</script>

<div
  class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 m-2 flex flex-col items-center"
>
  <div class="w-36 h-36">
    <PreviewImage
      bind:url={dish.url}
      bind:alt={dish.name}
      imgClass="w-full h-full object-cover rounded-md"
    />
  </div>
  <div>
    {dish.name}
  </div>
  <div>
    {FormatPriceDefault(dish.price)}
  </div>
</div>
