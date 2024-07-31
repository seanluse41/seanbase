<script>
    export let type;
    let color;
    switch (type) {
        case "Kintone":
            color = "yellow";
            break;
        case "Gamedev":
            color = "green";
            break;
        case "Webdev":
            color = "red";
            break;
        case "Svelte":
            color = "red";
            break;
        case "Privacy":
            color = "dark";
            break;
        case "Linux":
            color = "pink";
            break;
        case "Godot":
            color = "indigo";
            break;
        case "Mobile":
            color = "purple";
            break;
        default:
            color = "default";
            break;
    }
    import { Badge } from "flowbite-svelte";
</script>

<div class="flex justify-evenly">
    <Badge class="{color === 'purple' ? 'text-white' : 'text-slate'} ml-1 mb-1 font-bold"border {color}>{type}</Badge>
</div>
