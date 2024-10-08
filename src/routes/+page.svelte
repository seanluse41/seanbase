<script>
    import { onMount } from "svelte";
    import { derived } from "svelte/store";
    import { fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { Heading, P, Card, Button, Span, Hr, Img } from "flowbite-svelte";
    import {
        BadgeCheckOutline,
        LightbulbOutline,
        LockOutline,
        UserHeadsetOutline,
        WalletOutline,
    } from "flowbite-svelte-icons";
    import { _, locale } from "svelte-i18n";
    import creation from "../lib/course-creation-process.svg";
    const dev = import.meta.env.VITE_TEST;
    let visible = false;
    let cardDelay = 100;

    onMount(() => {
        visible = true;
    });

    const getPrinciplesArray = ($_) => [
        {
            title: $_("principles.1.title"),
            text: $_("principles.1.text"),
            icon: BadgeCheckOutline,
        },
        {
            title: $_("principles.2.title"),
            text: $_("principles.2.text"),
            icon: UserHeadsetOutline,
        },
        {
            title: $_("principles.3.title"),
            text: $_("principles.3.text"),
            icon: LightbulbOutline,
        },
        {
            title: $_("principles.4.title"),
            text: $_("principles.4.text"),
            icon: LockOutline,
        },
        {
            title: $_("principles.5.title"),
            text: $_("principles.5.text"),
            icon: WalletOutline,
        },
    ];

    const principlesArray = derived([locale, _], ([$locale, $_]) => {
        return getPrinciplesArray($_);
    });

    $: principles = $principlesArray;
    console.log(dev);
</script>

<main>
    <section class="hero text-white mt-8 px-4">
        <div class="container my-16">
            <Heading tag="h1" class="m-0 p-0 text-slate-700">SEANCO</Heading>
            {#if !dev}
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
            {/if}
            <div class="flex gap-4 mt-16">
                {#if !dev}
                    <Button size="xl" href="/products"
                        >{$_("about.ctaButton")}</Button
                    >
                {/if}

                <Button size="xl" href="/about"
                    >{$_("top.aboutButton")}</Button
                >
            </div>
        </div>
    </section>

    <section class="features px-4 mt-8 mb-8">
        <div class="container mx-auto">
            <Heading class="text-slate-700 my-8"
                >{$_("principles.title")}</Heading
            >
            <div class="grid md:grid-cols-3 gap-8">
                {#if visible}
                    {#if principles}
                        {#each principles as object, i}
                            <div
                                in:fly|global={{
                                    delay: i * cardDelay,
                                    duration: 500,
                                    y: 50,
                                    opacity: 0.5,
                                    easing: quintOut,
                                }}
                            >
                                <Card class="lg:h-56 sm:pt-3">
                                    <div
                                        class="flex items-center justify-between mb-4"
                                    >
                                        <Heading
                                            tag="h3"
                                            class="text-slate-700"
                                            customSize="text-xl font-bold"
                                            >{object.title}</Heading
                                        >
                                        <svelte:component
                                            this={object.icon}
                                            class="ml-1 flex-shrink-0 text-primary-700"
                                            size="xl"
                                        />
                                    </div>
                                    <P class="text-slate-700">{object.text}</P>
                                </Card>
                            </div>
                        {/each}
                    {/if}
                {/if}
            </div>
        </div>
    </section>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />

    {#if !dev}
        <section>
            <Card size="xl">
                <div class="flex flex-col lg:flex-row">
                    <div class="flex flex-col">
                        <Heading tag="h1" class="text-slate-700"
                            >{$_("top.consultHeading")}</Heading
                        >
                        <P class="mt-8 mr-8">{$_("top.consultText")}</P>
                        <Button href="/hire" class="mt-8 w-2/3 self-center"
                            >{$_("top.consultButton")}</Button
                        >
                    </div>
                    <Img src={creation} size="max-w-xs" />
                </div>
            </Card>
        </section>
    {/if}
</main>
