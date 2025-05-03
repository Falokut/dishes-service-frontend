<script lang="ts">
  import { orderRepo } from "$lib/app/defaults";
  import TgBackButton from "../components/tg_back_button.svelte";
  import type { UserOrder } from "$lib/types/user_order";
  import { Paginator } from "$lib/utils/paginator.svelte";
  import { Button } from "flowbite-svelte";
  import OrderItem from "./order_item.svelte";
  import { onMount } from "svelte";
  import Filter from "./filter.svelte";

  let page = $state(1);
  let orders: UserOrder[] = $state([]);
  let filteredOrders: UserOrder[] = $state([]);
  const pageLimit = 10;

  let startDate = $state("");
  let endDate = $state("");
  let showFilter = $state(false);

  const fetchOrders = async (limit: number, offset: number) => {
    return orderRepo.my(limit, offset);
  };

  let paginator = new Paginator(fetchOrders);

  let container: any;
  function handleScroll(event: any) {
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;

    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      paginator.canLoadMore
    ) {
      page++;
      updateOrders();
    }
  }

  const applyDateFilter = () => {
    filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && orderDate < start) return false;
      if (end && orderDate > end) return false;
      return true;
    });
  };

  const updateOrders = async () => {
    await paginator.getPageData(page, pageLimit, false);
    orders = paginator.GetAllData();
    applyDateFilter();
  };

  onMount(() => {
    updateOrders();
    window.addEventListener("scroll", handleScroll);
  });
</script>

<TgBackButton />

<div class="text-gray-800 dark:text-gray-100">
  <h3 class="text-center text-2xl font-semibold mb-2">Заказы</h3>
  <div class="flex justify-center mb-2">
    <Button color="alternative" onclick={() => (showFilter = !showFilter)}>
      {showFilter ? "Скрыть фильтр" : "Показать фильтр"}
    </Button>
  </div>

  {#if showFilter}
    <Filter bind:startDate bind:endDate {applyDateFilter} />
  {/if}

  <main bind:this={container} class="m-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
    {#each filteredOrders as _, i}
      <OrderItem bind:order={filteredOrders[i]} />
    {/each}
  </main>
</div>
