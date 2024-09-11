<script>
    import { Card, Img, Heading, P, Hr, Span, Button } from "flowbite-svelte";
    import { ArrowRightOutline, MailBoxOutline } from "flowbite-svelte-icons";
    import me from "../../lib/me.png";
    import meirl from "../../lib/meirl.JPG"
    import { _ } from "svelte-i18n";
    import Timeline from "../../components/timeline.svelte";
</script>

<Card size="xl" class="mt-8 p-8 self-center">
    <div class="flex flex-col md:flex-row justify-evenly items-center mb-8">
        <div class="flex flex-col mb-4 md:mb-0 order-1 md:order-none">
            <Heading tag="h1" class=" lg:mb-4 mt-4 sm:mb-0 leading-tight">
                {@html $_("about.intro")}
                <Span highlight highlightClass="text-purple-300">
                    {@html $_("about.name")}
                </Span>
                {@html $_("about.intro_end")}
            </Heading>
            <P class="p-2">{$_("about.subtitle")}</P>
        </div>
        <Img
            alt="notion style image of myself"
            class="rounded-full sm:w-60 md:w-72 md:max-w-lg order-2 md:order-none border-4 border-slate-700"
            src={meirl}
        />
    </div>
    <Button size="lg" href="/products" class="lg:w-1/3 self-center m-4">{$_("about.ctaButton")}<ArrowRightOutline class="w-5 h-5 ms-2" />
    </Button>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
    <div class="md:pr-16 md:pl-16 sm:pl-2 sm:pr-2">
        <Timeline />
    </div>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
    <Button size="lg" class="w-1/2 self-center m-8" href="/hire">{$_("about.leadToHire")}<MailBoxOutline class="w-5 h-5 ms-2" /></Button>
</Card>
