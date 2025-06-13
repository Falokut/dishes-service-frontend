<script lang="ts">
  import { Button, Modal } from "flowbite-svelte";
  const handleCancel = () => {};
  const handleApprove = () => {};

  let {
    openModal = $bindable(false),
    HandleApprove = handleApprove,
    HandleCancel = handleCancel,
    approveText = $bindable(""),
  } = $props();
</script>

<Modal
  title=""
  bind:open={openModal}
  dismissable={false}
  autoclose
  size="sm"
  class="w-full"
  backdropClass="fixed inset-0 z-40 bg-gray-900/80"
>
  <svg
    class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
    aria-hidden="true"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
      clip-rule="evenodd"
    />
  </svg>

  <p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
    {approveText}
  </p>
  <div class="flex justify-center items-center space-x-4">
    <Button id="cancel-delete-button" color="light" onclick={HandleCancel}
      >Нет, отменить</Button
    >
    <Button id="accept-deletion-button" color="green" onclick={HandleApprove}
      >Да, я уверен</Button
    >
  </div>
</Modal>
