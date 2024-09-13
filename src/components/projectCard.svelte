<script>
  import { _, locale } from "svelte-i18n";
  import { Card, ImagePlaceholder, P } from "flowbite-svelte";
  import TargetPicker from "./targetPicker.svelte";
  export let title;
  export let description;
  export let descriptionJA;
  export let link;
  export let imageURL;
  export let targets;
  export let forSale;

  $: localizedDescription = $locale === 'ja' && descriptionJA ? descriptionJA : description;
  $: isForSale = forSale && forSale.length > 0 && forSale[0] === 'True';
</script>

<div class="space-y-4 mb-4 lg:mr-8 transition-all duration-150 ease-in-out relative">
  <Card 
    class="!pt-2 h-[370px] w-80 flex flex-col shadow-xl {isForSale ? '' : 'opacity-70 pointer-events-none'}" 
    href={isForSale ? `/products/${link}` : null}
  >
    <div class="flex justify-end mb-1">
      {#each targets.value as target}
        <TargetPicker type={target} />
      {/each}
    </div>
    {#if imageURL}
      <div class="flex justify-center h-48">
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
        <span class="line-clamp-3">{localizedDescription}</span>
      </P>
    </div>
  </Card>
  {#if !isForSale}
  <div class="absolute top-20 right-4 bg-red-500 text-white py-1 px-16 text-sm font-bold transform rotate-45 translate-x-8 -translate-y-4 shadow-md">
    Coming Soon!
  </div>
  {/if}
</div>