<script>
    import { Button, Heading, Tooltip } from "flowbite-svelte";
    import { CodeBranchOutline, CartSolid } from "flowbite-svelte-icons";
    import { _ } from "svelte-i18n"

    export let title;
    export let githubLink;
    export let showBuyNowButton;
    const buyNowButtonClick = () => {
        console.log("buy now")
    }
</script>

<div id="ref-left" class="flex align-center">
    <Heading class="mb-10 mt-10 mr-10 w-auto">{title}</Heading>
    {#if githubLink}
        <a
            id="ext-ref"
            class="self-center justify-left"
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
        >
            <CodeBranchOutline size="xl" />
        </a>
        <Tooltip placement="top">{$_("check_out_github")}</Tooltip>
        <Tooltip reference="#ext-ref" triggeredBy="[id^='ref-']" placement="top"
            >{$_("check_out_github")}</Tooltip
        >
    {/if}
    {#if showBuyNowButton}
    <Button class="h-1/2 self-center" on:click={buyNowButtonClick}>
        <CartSolid class="w-5 h-5 me-2" /> {$_("buy_now")}
      </Button>
    {/if}
</div>
