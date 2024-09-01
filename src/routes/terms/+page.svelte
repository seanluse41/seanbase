<script lang="ts">
  import { Heading, P, Card, Accordion, AccordionItem, A } from "flowbite-svelte";
  import { _ } from "svelte-i18n";

  $: termsSections = [
    { title: $_("terms.services.title"), content: $_("terms.services.content") },
    { title: $_("terms.account_security.title"), content: $_("terms.account_security.content") },
    { title: $_("terms.intellectual_property.title"), content: $_("terms.intellectual_property.content") },
    { title: $_("terms.payment_terms.title"), content: $_("terms.payment_terms.content") },
    { title: $_("terms.cancellation.title"), content: $_("terms.cancellation.content") },
    { title: $_("terms.termination.title"), content: $_("terms.termination.content") },
    { title: $_("terms.account_termination.title"), content: $_("terms.account_termination.content") },
    { title: $_("terms.privacy.title"), content: $_("terms.privacy.content") },
    { title: $_("terms.changes.title"), content: $_("terms.changes.content") },
  ];
</script>

<div class="container mx-auto px-4 py-8">
  <Card size="xl">
    <Heading class="text-3xl font-bold mb-6">{$_("terms.title")}</Heading>

    <Accordion>
      {#each termsSections as section}
        <AccordionItem>
          <svelte:fragment slot="header">{section.title}</svelte:fragment>
          <P class="mb-3">
            {@html section.content}
          </P>
        </AccordionItem>
      {/each}
    </Accordion>
  </Card>
</div>