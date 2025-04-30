<script lang="ts">
  import { Button } from "flowbite-svelte";

  let {
    file = $bindable<File>({} as File),
    label = $bindable(""),
    outputUrl = $bindable(""),
    uploadLabel = $bindable(""),
  } = $props();

  function fileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length !== 1) {
      alert("Выберите один файл.");
      return;
    }

    const selectedFile = input.files[0];
    if (!selectedFile.type.startsWith("image/")) {
      alert("Файл должен быть изображением.");
      return;
    }

    file = selectedFile;
    outputUrl = URL.createObjectURL(file);
  }

  function openFileInput() {
    document.getElementById("file-upload-input")?.click();
  }
</script>

<div class="flex items-center gap-4">
  <div class="w-32 font-bold text-gray-900 dark:text-gray-200">
    {label}
  </div>
  <div class="flex justify-end w-full">
    <Button color="primary" class="w-1/2" on:click={openFileInput}>
      {uploadLabel}
    </Button>
  </div>
  <input
    type="file"
    id="file-upload-input"
    class="hidden"
    onchange={fileInput}
    accept="image/png, image/jpeg"
  />
</div>
