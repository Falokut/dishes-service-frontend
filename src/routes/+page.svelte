<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { authRepo } from "$lib/app/defaults";
  import { Button } from "flowbite-svelte";
  import { onMount } from "svelte";

  let pages: any[] = $state([]);
  const fetchUserPages = async () => {
    await authRepo.getAccessToken();
    const res = await fetch("/api/get-pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.pages) return;

      pages = data.pages;
      pages.sort((a, b) => {
        return ("" + a.prettyName).localeCompare(b.prettyName);
      });
    }
  };

  onMount(async () => {
    if (browser) await fetchUserPages();
  });
</script>

<div class="grid grid-cols-2 gap-1 p-1 content-center h-100">
  {#each pages as item}
    <Button
      class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
      color="primary"
      onclick={() => goto(item.url)}
    >
      {item.prettyName}
    </Button>
  {/each}
</div>
