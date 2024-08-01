<script>
    import { Card, Listgroup } from "flowbite-svelte";
    import {
        ClapperboardPlayOutline,
        CodeBranchOutline,
        EnvelopeOutline,
        GlobeOutline,
    } from "flowbite-svelte-icons";

    export let linkBox;
</script>

<Card padding="xl" size="xl">
    <div class="flex justify-between items-center mb-4">
        <h3
            class="text-2xl font-bold leading-none text-gray-900 dark:text-white"
        >
            Related Info
        </h3>
    </div>
    <Listgroup items={linkBox} let:item class="border-0 dark:!bg-transparent">
        <div class="flex items-center space-x-4 rtl:space-x-reverse justify-between">
            <div class="flex items-center w-96">
                {#if item.value.linkBoxIcon.value == "Web"}
                    <GlobeOutline />
                {:else if item.value.linkBoxIcon.value == "Github"}
                    <CodeBranchOutline />
                {:else if item.value.linkBoxIcon.value == "Steam"}
                    <GlobeOutline />
                {:else if item.value.linkBoxIcon.value == "Youtube"}
                    <ClapperboardPlayOutline />
                {:else if item.value.linkBoxIcon.value == "Twitter"}
                    <GlobeOutline />
                {:else if item.value.linkBoxIcon.value == "Email"}
                    <EnvelopeOutline />
                {:else}
                    <GlobeOutline />
                {/if}

                <div class="min-w-0 ml-2">
                    <p
                        class="text-lg text-gray-900 font-bold dark:text-white"
                    >
                        {item.value.linkBoxName.value}
                    </p>
                </div>
            </div>
            <div
                class="text-lg font-medium text-primary-600 hover:underline dark:text-primary-500 truncate !ml-20"
            >
                <a
                    href={item.value.linkBoxLink.value}
                    target="_blank"
                    rel="noopener noreferrer">{item.value.linkBoxLink.value}</a
                >
            </div>
        </div>
    </Listgroup>
</Card>
