<script>
    import {
        Timeline,
        TimelineItem,
        Button
    } from "flowbite-svelte";
    import {
        GlobeSolid,
        InfoCircleSolid,
        LanguageOutline,
        DesktopPcOutline,
        BriefcaseSolid,
        StarSolid,
        ArrowRightOutline
    } from "flowbite-svelte-icons";
    import { _ } from "svelte-i18n";
</script>

<Timeline order="vertical">
    <TimelineItem title={$_("timeline.1")} date={$_("timeline.1_date")}>
        <svelte:fragment slot="icon">
            <span
                class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900"
            >
                <GlobeSolid
                    class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
            </span>
        </svelte:fragment>
        <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
        >
            {$_("timeline.1_text")}
        </p>
    </TimelineItem>
    <TimelineItem title={$_("timeline.2")} date={$_("timeline.2_date")}>
        <svelte:fragment slot="icon">
            <span
                class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900"
            >
                <LanguageOutline
                    class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
            </span>
        </svelte:fragment>
        <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
        >
            {$_("timeline.2_text")}
        </p>
        <Button href="https://jetprogramme.org/" color="alternative" target="_blank" rel="noopener noreferrer">{$_("timeline.linkJET")}<ArrowRightOutline class="ms-2 w-5 h-5" /></Button>
    </TimelineItem>
    <TimelineItem title={$_("timeline.3")} date={$_("timeline.3_date")}>
        <svelte:fragment slot="icon">
            <span
                class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900"
            >
                <BriefcaseSolid
                    class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
            </span>
        </svelte:fragment>
        <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
        >
            {$_("timeline.3_text")}
        </p>
        <Button href="https://www.clair.or.jp/" color="alternative" target="_blank" rel="noopener noreferrer">{$_("timeline.linkCLAIR")}<ArrowRightOutline class="ms-2 w-5 h-5" /></Button>
    </TimelineItem>
    <TimelineItem title={$_("timeline.4")} date={$_("timeline.4_date")}>
        <svelte:fragment slot="icon">
            <span
                class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900"
            >
                <DesktopPcOutline
                    class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
            </span>
        </svelte:fragment>
        <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
        >
            {$_("timeline.4_text")}
        </p>
        <Button href="https://rea-fun.com/" color="alternative" target="_blank" rel="noopener noreferrer">{$_("timeline.linkREA")}<ArrowRightOutline class="ms-2 w-5 h-5" /></Button>
    </TimelineItem>
    <TimelineItem title={$_("timeline.5")} date={$_("timeline.5_date")}>
        <svelte:fragment slot="icon">
            <span
                class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900"
            >
                <InfoCircleSolid
                    class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
            </span>
        </svelte:fragment>
        <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
        >
            {$_("timeline.5_text")}
        </p>
        <Button href="https://burayama.com/" color="alternative" target="_blank" rel="noopener noreferrer">{$_("timeline.linkBURAYAMA")}<ArrowRightOutline class="ms-2 w-5 h-5" /></Button>
    </TimelineItem>
    <TimelineItem title={$_("timeline.6")} date={$_("timeline.6_date")}>
        <svelte:fragment slot="icon">
            <span
                class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900"
            >
                <BriefcaseSolid
                    class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
            </span>
        </svelte:fragment>
        <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
        >
            {$_("timeline.6_text")}
        </p>
        <Button href="https://www.cybozu.com/" color="alternative" target="_blank" rel="noopener noreferrer">{$_("timeline.linkCYBOZU")}<ArrowRightOutline class="ms-2 w-5 h-5" /></Button>
    </TimelineItem>
    <TimelineItem title={$_("timeline.7")} date={$_("timeline.7_date")}>
        <svelte:fragment slot="icon">
            <span
                class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900"
            >
                <StarSolid
                    class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
            </span>
        </svelte:fragment>
        <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
        >
            {$_("timeline.7_text")}
        </p>
    </TimelineItem>
</Timeline>