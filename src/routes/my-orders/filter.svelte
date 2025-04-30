<script>
  import { Button } from "flowbite-svelte";

  let {
    startDate = $bindable(""),
    endDate = $bindable(""),
    applyDateFilter = $bindable(() => {}),
  } = $props();
</script>

<div class="flex items-center justify-center">
  <div class="flex flex-col space-y-4">
    <div class="p-4 gap-3 flex flex-wrap space-y-3 justify-around">
      <div class="flex gap-3 flex-wrap">
        <div class="flex gap-3 items-center">
          <div>Дата начала:</div>
          <input
            type="date"
            bind:value={startDate}
            class="border rounded-md dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div class="flex gap-3 items-center">
          <div>Дата конца:</div>
          <input
            type="date"
            bind:value={endDate}
            class="border rounded-md dark:bg-gray-700 dark:text-gray-100"
            placeholder="Конечная дата"
          />
        </div>
      </div>
      <div class="flex gap-3 justify-around">
        <Button onclick={applyDateFilter} color="primary">Найти</Button>
        <Button
          onclick={() => {
            (startDate = ""), (endDate = ""), applyDateFilter();
          }}
          color="alternative">Сбросить</Button
        >
      </div>
    </div>
  </div>
</div>
