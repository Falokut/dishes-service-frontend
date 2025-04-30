<script>
  import { goto } from "$app/navigation";
  import { Card } from "flowbite-svelte";
  import { Button } from "flowbite-svelte";

  function goHome() {
    goto("/");
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <Card class="w-full max-w-md text-center shadow-lg">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold text-gray-800">🚫 Доступ запрещён</h1>
      <p class="text-gray-600 mt-2">
        У вас нет прав для просмотра этой страницы.
      </p>

      <Button color="red" class="mt-4" on:click={goHome}>
        Вернуться на главную
      </Button>
    </div>
  </Card>
</div>
