<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { init, backButton } from "@telegram-apps/sdk";
  import { goto } from "$app/navigation";

  let clean = () => {};
  let cleanClick = () => {};
  const defaultBackHandler = () => {
    goto("/", { replaceState: true });
  };

  let { visible = $bindable(true), onclick = $bindable(defaultBackHandler) } =
    $props();

  onMount(() => {
    clean = init();
    backButton.mount();
    visible ? backButton.show() : backButton.hide();
    cleanClick = backButton.onClick(onclick);
  });
  $effect(() => {
    visible ? backButton.show() : backButton.hide();
  });

  onDestroy(() => {
    clean();
    cleanClick();
    if (backButton.isMounted()) {
      backButton.hide();
      backButton.unmount();
    }
  });
</script>
