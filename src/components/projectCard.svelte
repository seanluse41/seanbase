<script>
    import { _ } from 'svelte-i18n';
    import { Card } from 'flowbite-svelte';
    export let image;
    export let title;
    export let link;
  </script>
  <div class="space-y-4 m-4">
    <Card img={image} href={link}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{$_(title)}</h5>
    </Card>
  </div>