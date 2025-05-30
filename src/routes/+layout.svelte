<script lang="ts">
  import { init, themeParams } from "@telegram-apps/sdk";
  import "../app.css";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import TgSettingsButton from "./components/tg_settings_button.svelte";
  import { authRepo } from "$lib/app/defaults";

  let { children } = $props();

  function applyTheme() {
    const root = document.documentElement;
    if (themeParams.isDark()) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  let clean = () => {};
  onMount(() => {
    if (!browser) return;

    const colorScheme = window?.Telegram?.WebApp?.colorScheme;
    if (colorScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (colorScheme === "light") {
      document.documentElement.classList.remove("dark");
    }

    clean = init();
    applyTheme();
  });
  onDestroy(() => {
    clean();
  });

  const reloadSession = () => {
    authRepo.clean()
    location.reload();
  };
</script>

<TgSettingsButton
  visible={true}
  actions={[{ name: "Перезагрузить сессию", onclick: reloadSession }]}
/>

{@render children()}
