<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { Heading, P, Card, Button, Span } from "flowbite-svelte";
    import { _, locale } from "svelte-i18n";

    let visible = false;
    let cardDelay = 250;

    onMount(() => {
        visible = true;
    });
</script>

<main>
    <section class="hero text-white py-24 px-4">
        <div class="container mx-auto">
            <Heading tag="h1" class="m-0 p-0 text-slate-700">SEANCO</Heading>
            {#if $locale === "en-US" || $locale === "en"}
                <Heading tag="h2" class="mb-4 text-slate-700">
                    {$_("top.subheadingUS")}
                    <Span highlight highlightClass="text-yellow-300">
                        {$_("top.subheadingIntro")}
                    </Span>
                    {$_("top.subheadingUSEnd")}
                </Heading>
            {:else}
                <Heading tag="h2" class="mb-4 text-slate-700">
                    <Span highlight highlightClass="text-yellow-300">
                        {$_("top.subheadingIntro")}
                    </Span>
                    {$_("top.subheading")}
                </Heading>
            {/if}
            <P size="xl" class="mb-8 text-slate-700">
                {$_("top.subheading2")}
            </P>
            <div class="flex gap-4">
                <Button size="xl" href="/products"
                    >{$_("about.ctaButton")}</Button
                >
                <Button size="xl" href="/about" color="alternative"
                    >{$_("top.aboutButton")}</Button
                >
            </div>
        </div>
    </section>

    <section class="features py-16 px-4">
        <div class="container mx-auto">
            <div class="grid md:grid-cols-3 gap-8">
                {#if visible}
                    {#each Array(5) as _, i}
                        <div
                            in:fly={{
                                delay: i * cardDelay,
                                duration: 3000,
                                y: 50,
                                opacity: 0.5,
                                easing: quintOut,
                            }}
                        >
                            <Card>
                                <Heading
                                    tag="h3"
                                    class="mb-4"
                                    customSize="text-2xl font-bold"
                                    >Feature {i + 1}</Heading
                                >
                                <P>
                                    Plug and play, instant simple solutions for
                                    your organization's Kintone environment.
                                </P>
                            </Card>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
    </section>
</main>
