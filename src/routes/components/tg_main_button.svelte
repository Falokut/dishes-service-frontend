<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { init, mainButton } from "@telegram-apps/sdk";
  let {
    label = $bindable("OK"),
    visible = $bindable(true),
    isEnabled = $bindable(true),
    onclick = $bindable<VoidFunction>(() => {}),
  } = $props();

  let clean = () => {};
  let cleanClick = () => {};
  const eventWrapper = (e: any) => {
    onclick();
  };
  onMount(() => {
    clean = init();
    mainButton.mount();
    mainButton.setParams({
      text: label,
      isVisible: visible,
      isEnabled: isEnabled,
      textColor: "#ffffff",
      backgroundColor: "#ff7a00",
    });
    cleanClick = mainButton.onClick((e: any) => {
      eventWrapper(e);
    });
  });
  $effect(() => {
    mainButton.setParams({
      text: label,
      isVisible: visible,
      isEnabled: isEnabled,
    });
  });

  onDestroy(() => {
    clean();
    cleanClick();
    if (mainButton.isMounted()) {
      mainButton.setParams({ isEnabled: false, isVisible: false });
      mainButton.unmount();
    }
  });
</script>
