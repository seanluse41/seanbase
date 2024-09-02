<script>
    import ProjectCard from "../../components/projectCard.svelte";
    import Loader from "../../components/loader.svelte";
    import { fly } from "svelte/transition";
    import { Heading, P, Hr, Span, Card, Tabs, TabItem } from "flowbite-svelte";
    import { _ } from "svelte-i18n";

    export let data;
    let cardDelay = 100; // Delay between each card in milliseconds
    let activeTabValue = 0; // To keep track of the active tab
</script>

<div class="flex flex-col lg:flex-row mt-4 pb-8">
    <!-- Combined card for mobile, split for desktop -->
    <Card class="w-full lg:w-3/5 mt-8 mb-8" size="xl">
        <div class="p-4 flex flex-col h-full overflow-hidden">
            <Heading tag="h1" class="mb-4"
                >{$_("projects.kintone.title")}<Span
                    highlight
                    highlightClass="text-yellow-300"
                    >{$_("projects.kintone.titleHighlight")}</Span
                >.</Heading
            >
            <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
            <P class="mb-4">
                {$_("projects.kintone.introduction")}
            </P>
        </div>
    </Card>

    <!-- Desktop view remains unchanged -->
    <div class="hidden lg:block lg:w-2/5 h-screen overflow-y-auto pl-4">

    </div>
</div>
