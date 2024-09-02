<script>
    import { Heading, P, Hr, Span, Card, Img } from "flowbite-svelte";
    import { _ } from "svelte-i18n";
    import powerup from "../../lib/powerUp.png";
    export let data;
</script>

<Card size="xl" class="mt-8 p-8 self-center">
    <div class="flex flex-col md:flex-row justify-evenly items-center mb-8">
        <div class="flex flex-col mb-4 md:mb-0 order-1 md:order-none">
            <Heading tag="h1" class=" lg:mb-4 mt-4 sm:mb-0">
                {$_("projects.kintone.title")}
                <Span highlight highlightClass="text-yellow-300">
                    {$_("projects.kintone.titleHighlight")}
                </Span>
                {@html $_("projects.kintone.titleEnd")}
            </Heading>
            <P class="mb-4">
                {$_("projects.kintone.introduction")}
            </P>
        </div>
        <Img
            alt="notion style image of plugins"
            class="rounded-lg sm:w-60 md:w-72 md:max-w-lg order-2 md:order-none"
            src={powerup}
        />
    </div>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
</Card>
