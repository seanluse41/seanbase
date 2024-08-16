<script>
    import { Accordion, AccordionItem, Card } from "flowbite-svelte";
    import { _ } from "svelte-i18n";
    import {
        ClapperboardPlayOutline,
        CodeBranchOutline,
        EnvelopeOutline,
        GlobeOutline,
    } from "flowbite-svelte-icons";

    export let linkBox;

    function getIcon(iconName) {
        switch (iconName) {
            case "Web": return GlobeOutline;
            case "Github": return CodeBranchOutline;
            case "Steam": return GlobeOutline;
            case "Youtube": return ClapperboardPlayOutline;
            case "Twitter": return GlobeOutline;
            case "Email": return EnvelopeOutline;
            default: return GlobeOutline;
        }
    }
</script>

<Card padding="xl" size="xl">
    <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold leading-none text-gray-900 dark:text-white">
            {$_("related_info")}
        </h3>
    </div>
    <Accordion class="border-0 dark:!bg-transparent">
        {#each linkBox as item}
            <AccordionItem>
                <span slot="header" class="text-base flex items-center gap-2">
                    <svelte:component this={getIcon(item.value.linkBoxIcon.value)} class="w-5 h-5" />
                    <span class="font-semibold">{item.value.linkBoxName.value}</span>
                </span>
                <div class="py-2">
                    <a
                        href={item.value.linkBoxLink.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-600 dark:text-blue-500 hover:underline break-all"
                    >
                        {item.value.linkBoxLink.value}
                    </a>
                </div>
            </AccordionItem>
        {/each}
    </Accordion>
</Card>