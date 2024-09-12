<script>
  import { _ } from "svelte-i18n";
  import { Card, ImagePlaceholder, P } from "flowbite-svelte";
  import TargetPicker from "./targetPicker.svelte";
  export let title;
  export let description;
  export let link;
  export let imageURL;
  export let targets;
</script>

<div
  class="space-y-4 mb-4 lg:mr-8 transition ease-in-out duration-150"
>
  <Card class="!pt-2 h-[370px] w-80 flex flex-col shadow-xl" href={`/products/${link}`}>
    <div class="flex justify-end mb-1">
      {#each targets.value as target}
        <TargetPicker type={target} />
      {/each}
    </div>
    {#if imageURL}
      <div class="imageFrame h-48">
        <img
          class="p-0 rounded-t-lg h-full w-full object-contain"
          src={imageURL}
          alt={title}
        />
      </div>
    {:else}
      <div class="h-48">
        <ImagePlaceholder imgOnly={true} class="h-full" />
      </div>
    {/if}
    <div class="flex flex-col flex-grow p-2">
      <h5 class="text-2xl font-bold tracking-tight text-stone-700 mb-2">
        {$_(title)}
      </h5>
      <P class="flex-grow overflow-hidden" color="text-stone-700">
        <span class="line-clamp-3">{$_(description)}</span>
      </P>
    </div>
  </Card>
</div>

<style>
  .imageFrame {
    display: flex;
    justify-content: center;
  }
</style>
