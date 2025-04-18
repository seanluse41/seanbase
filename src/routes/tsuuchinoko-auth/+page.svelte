<!-- src/routes/tsuuchinoko-auth/+page.svelte -->
<script>
    import { Button, Heading, P, List, Li, Card } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { _ } from "svelte-i18n";

    let redirectAttempted = false;
    let countdown = 5;

    onMount(() => {
        const code = $page.url.searchParams.get("code");
        const state = $page.url.searchParams.get("state");

        if (code) {
            // For Android, we should stay on the same page
            // The Android system will handle redirecting to the app
            // For desktop, we create a custom URL scheme
            const isAndroid = /Android/i.test(navigator.userAgent);

            if (!isAndroid) {
                // Only do direct URL scheme redirect for desktop
                const deepLinkUrl = new URL("tsuuchinoko://oauth/callback");
                deepLinkUrl.searchParams.set("code", code);
                if (state) {
                    deepLinkUrl.searchParams.set("state", state);
                }

                // Attempt to redirect
                window.location.href = deepLinkUrl.toString();
            }

            redirectAttempted = true;

            // Start countdown
            const timer = setInterval(() => {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(timer);
                }
            }, 1000);
        }
    });
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4">
    {#if !$page.url.searchParams.get("code")}
        <Card padding="xl" class="max-w-lg">
            <Heading tag="h1" class="text-center mb-4" color="text-red-700">
                {$_("tsuuchinoko-auth.error.title")}
            </Heading>
            <P color="text-red-600">
                {$_("tsuuchinoko-auth.error.missing_code")}
            </P>
        </Card>
    {:else if redirectAttempted}
        <Card padding="xl" class="max-w-lg">
            <Heading tag="h1" class="text-center mb-4">
                {$_("tsuuchinoko-auth.opening.title")}
            </Heading>
            <P class="mb-4">
                {$_("tsuuchinoko-auth.opening.countdown", {
                    values: { seconds: countdown },
                })}
            </P>

            <List ordered class="space-y-1 mb-4">
                <Li>{$_("tsuuchinoko-auth.steps.install")}</Li>
                <Li>{$_("tsuuchinoko-auth.steps.retry")}</Li>
                <Li>{$_("tsuuchinoko-auth.steps.copy_code")}</Li>
            </List>

            {#if !/Android/i.test(navigator.userAgent)}
                <Button
                    color="primary"
                    class="w-full mb-4"
                    on:click={() => {
                        const code = $page.url.searchParams.get("code");
                        const state = $page.url.searchParams.get("state");
                        const deepLinkUrl = new URL(
                            "tsuuchinoko://oauth/callback",
                        );
                        deepLinkUrl.searchParams.set("code", code);
                        if (state) deepLinkUrl.searchParams.set("state", state);
                        window.location.href = deepLinkUrl.toString();
                    }}
                >
                    {$_("tsuuchinoko-auth.buttons.open")}
                </Button>
            {/if}

            <Card padding="sm" class="mt-4">
                <P weight="semibold" class="mb-2"
                    >{$_("tsuuchinoko-auth.auth_code.title")}</P
                >
                <div
                    class="p-2 bg-gray-50 rounded dark:bg-gray-800 font-mono break-all"
                >
                    {$page.url.searchParams.get("code")}
                </div>
            </Card>
        </Card>
    {:else}
        <Card padding="xl" class="max-w-lg">
            <Heading tag="h1" class="text-center mb-4">
                {$_("tsuuchinoko-auth.redirect.title")}
            </Heading>
            <P class="text-center">
                {$_("tsuuchinoko-auth.redirect.wait")}
            </P>
        </Card>
    {/if}
</div>
