<script>
    import {
        Card,
        Img,
        Heading,
        P,
        Hr,
        Span,
    } from "flowbite-svelte";
    import me from "../../lib/me.png";
    import { _ } from "svelte-i18n";
    import Timeline from "../../components/timeline.svelte";
</script>

<Card size="xl" class="mt-8 p-8">
    <div class="flex flex-col md:flex-row justify-evenly items-center mb-8">
        <div class="flex flex-col mb-4 md:mb-0 order-1 md:order-none">
            <Heading tag="h1" class=" lg:mb-4 mt-4 sm:mb-0">
                {$_("about.intro")}
                <Span highlight highlightClass="text-yellow-300">
                    {$_("projects.kintone.titleHighlight")}
                </Span>
                {$_("about.intro_end")}
            </Heading>
        </div>
        <Img
            alt="notion style image of myself"
            class="rounded-lg lg:w-96 md:w-72 md:max-w-lg order-2 md:order-none"
            src={me}
        />
    </div>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
    <div class="md:pr-16 md:pl-16 sm:pl-2 sm:pr-2">
        <Timeline />
    </div>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
</Card>
