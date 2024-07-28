<script>
  import { _ } from "svelte-i18n";
  import { Card, ImagePlaceholder, P } from "flowbite-svelte";
  export let title;
  export let type;
  export let description;
  export let link;
  export let imageURL;
</script>

<div class="space-y-4 m-4 hover:scale-105 transition ease-in-out duration-150">
    <Card class="!p-0 h-[350px] w-80 flex flex-col" href={`/${link}`}>
      {#if imageURL}
        <div class="imageFrame h-48">
          <img class="p-0 rounded-t-lg h-full w-full object-cover" src={imageURL} alt={title} />          
        </div>
      {:else}
        <div class="h-48">
          <ImagePlaceholder imgOnly={true} class="h-full"/>
        </div>
      {/if}
      <div class="flex flex-col flex-grow p-2">
        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {$_(title)}
        </h5>
        <P class="flex-grow overflow-hidden" color="text-gray-500 dark:text-gray-400">
          <span class="line-clamp-3">{$_(description)}</span>
        </P>
      </div>
    </Card>
</div>

<style>
  .imageFrame {
    display: flex;
    justify-content: center;
    background: lightgray;
  }

  :global(.line-clamp-3) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>