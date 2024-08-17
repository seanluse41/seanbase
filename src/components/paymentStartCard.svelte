<script>
    import { Card, Button } from "flowbite-svelte";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import { _ } from "svelte-i18n";
    import ContactForm from './contactForm.svelte';

    export let onPayStartClicked;
    let contactFormOpen = false;

</script>

<Card size="xl" padding="xl" class="shadow-lg shadow-purple-500">
    <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {$_("payment_card_header")}
    </h5>
    <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-3xl font-semibold">￥</span>
        <span class="text-5xl font-extrabold tracking-tight">500</span>
        <span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400"
            >/{$_("month")}</span
        >
    </div>
    <!-- List -->
    <ul class="my-7 space-y-4">
        <li class="flex space-x-2 rtl:space-x-reverse">
            <CheckCircleSolid
                class="w-4 h-4 text-primary-600 dark:text-primary-500"
            />
            <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{$_("kGuide_features1")}</span
            >
        </li>
        <li class="flex space-x-2 rtl:space-x-reverse">
            <CheckCircleSolid
                class="w-4 h-4 text-primary-600 dark:text-primary-500"
            />
            <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{$_("kGuide_features2")}</span
            >
        </li>
        <li class="flex space-x-2 rtl:space-x-reverse">
            <CheckCircleSolid
                class="w-4 h-4 text-primary-600 dark:text-primary-500"
            />
            <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{$_("kGuide_features3")}</span
            >
        </li>
        <li class="flex space-x-2 rtl:space-x-reverse">
            <CheckCircleSolid
                class="w-4 h-4 text-primary-600 dark:text-primary-500"
            />
            <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{$_("kGuide_features4")}</span
            >
        </li>
        <li class="flex space-x-2 rtl:space-x-reverse">
            <CheckCircleSolid
                class="w-4 h-4 text-primary-600 dark:text-primary-500"
            />
            <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{$_("kGuide_features5")}</span
            >
        </li>
        <li class="flex space-x-2 rtl:space-x-reverse">
            <CheckCircleSolid
                class="w-4 h-4 text-primary-600 dark:text-primary-500"
            />
            <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{$_("kGuide_features6")}</span
            >
        </li>
        <li class="flex space-x-2 rtl:space-x-reverse">
            <CheckCircleSolid
                class="w-4 h-4 text-primary-600 dark:text-primary-500"
            />
            <span
                class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
                >{$_("kGuide_features7")}</span
            >
        </li>
    </ul>
    <div class="flex">
        <Button on:click={onPayStartClicked} class="w-1/2 m-1">{$_("payment_card_subscribe_now")}</Button>
        <Button on:click={() => contactFormOpen = true} class="w-1/2 m-1">{$_("payment_card_inquiry")}</Button>
    </div>
</Card>

<ContactForm bind:open={contactFormOpen} />