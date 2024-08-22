<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { _ } from "svelte-i18n";
    import {
        Heading,
        P,
        Card,
        Checkbox,
        List,
        Li,
        Button,
    } from "flowbite-svelte";

    let subscriptionData;
    let nextSteps = [
        { id: 1, text: "step1", checked: false },
        { id: 2, text: "step2", checked: false },
        { id: 3, text: "step3", checked: false },
        { id: 4, text: "step4", checked: false },
        { id: 5, text: "step5", checked: false },
        { id: 6, text: "step6", checked: false },
        { id: 7, text: "step7", checked: false },
        { id: 8, text: "step8", checked: false },
        { id: 9, text: "step9", checked: false },
    ];

    onMount(() => {
        subscriptionData = $page.state;
    });

    function toggleStep(id) {
        nextSteps = nextSteps.map((step) =>
            step.id === id ? { ...step, checked: !step.checked } : step,
        );
    }

    function downloadReceipt() {
        // Construct the URL with query parameters
        const url = `/generate-receipt?product=${encodeURIComponent(subscriptionData.product)}&customer_name=${encodeURIComponent(subscriptionData.customer_name)}&customer_email=${encodeURIComponent(subscriptionData.customer_email)}&customer_phone=${encodeURIComponent(subscriptionData.customer_phone)}&amount=${encodeURIComponent(subscriptionData.amount)}&currency=${encodeURIComponent(subscriptionData.currency)}`;
        // Trigger the download
        window.location.href = url;
    }
</script>

<div class="container mx-auto px-4 py-8">
    {#if subscriptionData}
        <Heading tag="h1" class="mb-6"
            >{$_("subscriptionSuccess.title")}</Heading
        >
        <Card size="xl">
            <P class="mb-4">
                {$_("subscriptionSuccess.thankYou", {
                    values: { name: subscriptionData.customer_name },
                })}
            </P>

            <Heading tag="h2" customSize="text-xl" class="mb-2"
                >{$_("subscriptionSuccess.details")}</Heading
            >
            <List tag="ul" class="mb-4">
                <Li
                    >{$_("subscriptionSuccess.email")}: {subscriptionData.customer_email}</Li
                >
                <Li
                    >{$_("subscriptionSuccess.phone")}: {subscriptionData.customer_phone}</Li
                >
                <Li
                    >{$_("subscriptionSuccess.amount")}: {subscriptionData.amount}
                    {subscriptionData.currency.toUpperCase()}</Li
                >
                <Li
                    >{$_("subscriptionSuccess.nextBilling")}: {new Date(
                        subscriptionData.current_period_end,
                    ).toLocaleDateString()}</Li
                >
            </List>

            <Button on:click={downloadReceipt} class="w-1/4 mt-2 mb-2"
                >{$_("subscriptionSuccess.downloadReceipt")}</Button
            >

            <P>{$_("subscriptionSuccess.confirmation")}</P>

            <Heading tag="h2" customSize="text-xl" class="mt-6 mb-2"
                >{$_("subscriptionSuccess.nextStepsTitle")}</Heading
            >
            <List tag="ol" class="space-y-2">
                {#each nextSteps as step (step.id)}
                    <Li class="flex items-center">
                        <div class="mr-4">{step.id}.</div>
                        <Checkbox
                            class="mt-1 mr-2 mb-1 flex-shrink-0"
                            checked={step.checked}
                            on:change={() => toggleStep(step.id)}
                        />
                        <span class={step.checked ? "line-through" : ""}>
                            {$_(`subscriptionSuccess.nextSteps.${step.text}`, {
                                values: {
                                    email: subscriptionData.customer_email,
                                },
                            })}
                        </span>
                    </Li>
                {/each}
            </List>
        </Card>
    {:else}
        <P>{$_("subscriptionSuccess.noData")}</P>
    {/if}
</div>
