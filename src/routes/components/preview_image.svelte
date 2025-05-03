<script>
  let {
    url = $bindable(""),
    alt = $bindable(""),
    imgClass = $bindable(""),
  } = $props();
</script>

<img class={imgClass != "" ? imgClass : "preview"} src={url} {alt} />

<style>
  .preview {
    object-fit: scale-down fill;
  }
</style>
