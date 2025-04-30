<script>
  import { goto } from "$app/navigation";
  import { Card, Button } from "flowbite-svelte";
  import { CloseCircleSolid } from "flowbite-svelte-icons";

  export let error;
  export let status;

  function goHome() {
    goto("/");
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <Card class="w-full max-w-md text-center shadow-lg">
    <div class="flex flex-col items-center">
      <CloseCircleSolid class="w-16 h-16 text-yellow-500 mb-4" />
      <h1 class="text-3xl font-bold text-gray-800">
        {status === 404 ? "404 - Страница не найдена" : "Произошла ошибка"}
      </h1>
      <p class="text-gray-600 mt-2">
        {status === 404
          ? "Запрошенная страница не существует."
          : (error?.message ?? "Что-то пошло не так.")}
      </p>

      <Button color="blue" class="mt-4" on:click={goHome}>
        Вернуться на главную
      </Button>
    </div>
  </Card>
</div>
