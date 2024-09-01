<script lang="ts">
  import { Heading, P, Card, List, Li, Accordion, AccordionItem } from "flowbite-svelte";
  import { _ } from "svelte-i18n";

  $: privacySections = [
    {
      title: $_("privacy.info_collection"),
      content: $_("privacy.info_collection_text"),
      items: $_("privacy.info_items"),
    },
    {
      title: $_("privacy.how_we_collect"),
      content: $_("privacy.how_we_collect_text"),
    },
    {
      title: $_("privacy.use_of_info"),
      content: $_("privacy.use_of_info_text"),
      items: $_("privacy.use_of_info_items"),
    },
    {
      title: $_("privacy.info_storage"),
      content: $_("privacy.info_storage_text"),
      items: $_("privacy.info_storage_items"),
    },
    {
      title: $_("privacy.info_sharing"),
      content: $_("privacy.info_sharing_text"),
    },
    {
      title: $_("privacy.data_protection"),
      content: $_("privacy.data_protection_text"),
    },
    {
      title: $_("privacy.cookies_tracking"),
      content: $_("privacy.cookies_tracking_text"),
    },
    {
      title: $_("privacy.accessing_updating"),
      content: $_("privacy.accessing_updating_text"),
      items: $_("privacy.accessing_updating_items"),
    },
    {
      title: $_("privacy.childrens_privacy"),
      content: $_("privacy.childrens_privacy_text"),
    },
    {
      title: $_("privacy.changes_to_policy"),
      content: $_("privacy.changes_to_policy_text"),
    },
    {
      title: $_("privacy.contact_us"),
      content: $_("privacy.contact_us_text"),
      items: $_("privacy.contact_info"),
    },
  ];
</script>

<div class="container mx-auto px-4 py-8">
  <Card size="xl">
    <Heading class="text-3xl font-bold mb-6">{$_("privacy.title")}</Heading>

    <Accordion>
      {#each privacySections as section, index}
        <AccordionItem>
          <svelte:fragment slot="header">{section.title}</svelte:fragment>
          <P class="mb-3">{section.content}</P>
          {#if section.items}
            <List class="list-disc list-inside">
              {#each section.items as item}
                <Li>{item}</Li>
              {/each}
            </List>
          {/if}
        </AccordionItem>
      {/each}
    </Accordion>
  </Card>
</div>