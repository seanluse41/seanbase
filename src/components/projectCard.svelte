<script>
  import { _ } from "svelte-i18n";
  import { Card, CardPlaceholder, ImagePlaceholder } from "flowbite-svelte";
  export let id;
  export let title;
  export let link;
  export let type;
  let imageURL;

  const getImage = async (recordID) => {
    const imageRequest = await fetch("/getImages", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ recordID }),
    });
    if (imageRequest.status == 200) {
      let imageBlob = await imageRequest.blob();
      imageURL = URL.createObjectURL(imageBlob);
    } else {
      imageURL = null;
    }
  };
</script>

<div class="space-y-4 m-4">
  {#await getImage(id)}
    <CardPlaceholder size="lg" class="mt-8" />
  {:then}
    {#if imageURL}
      <Card img={imageURL} class="sm/p-0" href={link}>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {$_(title)}
        </h5>
      </Card>
    {:else}
      <Card class="sm/p-0" href={link}>
        <ImagePlaceholder imgHeight={96} />
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {$_(title)}
        </h5>
      </Card>
    {/if}
  {/await}
</div>
