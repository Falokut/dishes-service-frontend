<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { init, settingsButton } from "@telegram-apps/sdk";
  import { fly } from "svelte/transition";
  import { Button } from "flowbite-svelte";

  interface ButtonAction {
    name: string;
    onclick: () => void;
  }

  let {
    visible = $bindable<boolean>(true),
    actions = $bindable<ButtonAction[]>([]),
  } = $props();

  let clean = () => {};
  let cleanClick = () => {};
  let showMenu = $state(false);

  const handleClick = () => {
    showMenu = !showMenu;
  };

  onMount(() => {
    clean = init();
    settingsButton.mount();
    visible ? settingsButton.show() : settingsButton.hide();
    cleanClick = settingsButton.onClick(handleClick);
  });

  $effect(() => {
    visible ? settingsButton.show() : settingsButton.hide();
  });

  onDestroy(() => {
    clean();
    cleanClick();
    if (settingsButton.isMounted()) {
      settingsButton.hide();
      settingsButton.unmount();
    }
  });

  const handleAction = (action: () => void) => {
    showMenu = false;
    action();
  };
</script>

{#if showMenu}
  <div
    transition:fly={{ y: 10, duration: 150 }}
    class="absolute bottom-16 right-4 bg-white rounded-xl shadow-xl z-50 p-2 space-y-2 w-64"
  >
    {#each actions as action}
      <Button
        color="light"
        size="md"
        class="w-full justify-start text-gray-800 text-sm font-medium"
        onclick={() => handleAction(action.onclick)}
      >
        {action.name}
      </Button>
    {/each}
  </div>
{/if}
