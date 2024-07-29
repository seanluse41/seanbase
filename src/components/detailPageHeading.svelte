<script>
import { Heading, Tooltip } from "flowbite-svelte";
import { CodeBranchOutline } from "flowbite-svelte-icons";

export let title;
export let githubLink;

</script>

<div id="ref-left" class="flex align-center">
    <Heading  class="mb-10 mt-10 mr-10 w-auto">{title}</Heading>
    <a id="ext-ref" class="self-center justify-left" href={githubLink}>
        <CodeBranchOutline size="xl" />
    </a>
    <Tooltip placement="top">Check it out on Github</Tooltip>
    <Tooltip reference="#ext-ref" triggeredBy="[id^='ref-']" placement="top">Check it out on Github</Tooltip>
</div>