<script lang="ts">
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { FormatPriceDefault } from "$lib/utils/format_price";
  import type { UserOrder } from "$lib/types/user_order";

  let { order = $bindable<UserOrder>() } = $props();

  let showOrderItems = $state(false);
  let orderStatus = $state("");
  let orderDate = $state("");

  onMount(() => {
    let createdAt = new Date(order.createdAt);
    orderDate = createdAt.toISOString().slice(0, 10);
    orderDate +=
      " " +
      String(createdAt.getHours()).padStart(2, "0") +
      ":" +
      String(createdAt.getMinutes()).padStart(2, "0");
    switch (order.status) {
      case "PROCESS":
        orderStatus = "в процессе";
        break;
      case "PAID":
        orderStatus = "оплачен";
        break;
      case "CANCELED":
        orderStatus = "отменён";
        break;
      case "SUCCESS":
        orderStatus = "выполнен";
        break;
      default:
        orderStatus = "";
        break;
    }
  });
</script>

<div class="p-4 w-full">
  <section class="flex items-baseline space-x-4 w-full justify-around">
    <div class="text-gray-900 dark:text-gray-100 font-medium">
      Заказ от {orderDate}
    </div>
    <button
      class="text-gray-900 dark:text-gray-100 hover:text-green-500 focus:outline-none"
      onclick={() => (showOrderItems = !showOrderItems)}
    >
      {showOrderItems ? "▲" : "▼"}
    </button>
  </section>

  <section class="mt-4">
    {#if showOrderItems}
      <div
        class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-300 dark:border-gray-500"
        transition:slide={{
          delay: 250,
          duration: 300,
          easing: quintOut,
          axis: "y",
        }}
      >
        {#each order.items as item}
          <div class="flex justify-between mb-2">
            <div
              class="name-count text-gray-900 dark:text-gray-100 font-medium"
            >
              {item.name} x {item.count}
            </div>
            <div class="text-right text-gray-900 dark:text-gray-100">
              {FormatPriceDefault(item.totalPrice)}
            </div>
          </div>
        {/each}

        <div class="mt-4">
          {#if orderStatus != ""}
            <div class="text-gray-900 dark:text-gray-100">
              Статус: {orderStatus}
            </div>
          {/if}

          <div class="font-semibold text-gray-900 dark:text-gray-100 mt-2">
            Итого: {FormatPriceDefault(order.total)}
          </div>
        </div>
      </div>
    {/if}
  </section>
</div>
