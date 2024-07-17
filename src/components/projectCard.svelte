<script>
  import { _ } from "svelte-i18n";
  import { Card, ImagePlaceholder } from "flowbite-svelte";
  export let id;
  export let title;
  export let type;
  export let description;
  export let link;
  export let imageURL;
</script>

<div class="space-y-4 m-4">
    {#if imageURL}
      <Card class="!p-0 h-64 w-80" href={`/${link}?id=${id}`}>
        <img class="p-0 rounded-t-lg max-h-48 object-contain" src={imageURL} alt={title} />
        <h5
          class="p-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {$_(title)}
        </h5>
      </Card>
    {:else}
      <Card class="!p-0 h-64 w-80 items-center" href={link}>
        <ImagePlaceholder imgOnly={true}/>
        <h5
          class="p-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {$_(title)}
        </h5>
      </Card>
    {/if}
</div>
