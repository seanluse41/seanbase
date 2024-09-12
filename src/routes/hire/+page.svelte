<script>
    import { _ } from "svelte-i18n";
    import { Card, Heading } from "flowbite-svelte";
    import ContactForm from "../../components/contactForm.svelte";
</script>

<div class="flex flex-col">
    <Heading class="text-slate-700 self-center my-8 w-auto">{$_("hire.title")}</Heading>
    <Card size="xl">
        <ContactForm isModal={false} />
    </Card>
</div>

