<script>
  import { Modal, Button } from "flowbite-svelte";
  import { _ } from "svelte-i18n";

  export let open = false;
  export let errorMessage = "";
  export let onClose = () => {};
  export let onContactSupport = () => {};

  function handleContactSupport() {
    onContactSupport();
    open = false;
  }
</script>

<Modal bind:open size="sm" autoclose={false}>
  <div class="text-center">
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      {$_("error.title")}
    </h3>
    <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">
      {errorMessage}
    </p>
    <div class="flex justify-center gap-4">
      <Button color="alternative" on:click={onClose}>
        {$_("error.cancel")}
      </Button>
      <Button color="red" on:click={handleContactSupport}>
        {$_("error.contactSupport")}
      </Button>
    </div>
  </div>
</Modal>