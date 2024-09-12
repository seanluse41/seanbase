<script>
    import { _ } from "svelte-i18n";
    import { Card, Heading, Img, P } from "flowbite-svelte";
    import ContactForm from "../../components/contactForm.svelte";
    import workTogether from "../../lib/process-flow-diagram.svg";
</script>

<Card size="xl" class="mt-8">
    <div class="flex flex-col lg:flex-row justify-center">
        <div class="flex flex-col self-center">
            <Heading class="text-slate-700 self-center mt-8 lg:my-8 w-auto"
                >{$_("hire.title")}</Heading
            >
            <P
                >{$_("hire.subtext")}</P
            >
        </div>
        <Img src={workTogether} size="max-w-xs" />
    </div>
    <ContactForm isModal={false} />
</Card>
