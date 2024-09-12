<script>
    export let type;
    let text;
    let color;
    switch (type) {
        case "ep":
            text = "enterprise";
            color = "indigo";
            break;
        case "smb":
            text = "smallBusiness";
            color = "green";
            break;
        case "int":
            text = "international";
            color = "teal";
            break;
        case "dev":
            text = "developer";
            color = "purple";
            break;
    }
    import { Indicator, Tooltip } from "flowbite-svelte";
    import { _ } from "svelte-i18n";
</script>

<span class="flex items-center"
    ><Indicator size="xs" {color} class="ml-1 mr-1" /><div class="text-[12px] p-1">{$_(`tooltip.${text}`)}</div></span
><Tooltip>{$_(`tooltip.${type}`)}</Tooltip>
