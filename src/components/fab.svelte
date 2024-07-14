<script>
    import { onMount } from "svelte";
    import { SpeedDial } from "flowbite-svelte";
    import { CaretUpSolid } from "flowbite-svelte-icons";
    let scrollToTop;

    let test = () => {
        console.log("test");
    };

    onMount(() => {
        let topElement = document.getElementById("top");
        scrollToTop = () => {
            console.log("hello");
            topElement ? window.scrollTo(0,0) : null;
        };
    });
</script>

<div on:click={scrollToTop} role="button">
    <SpeedDial color="purple">
        <CaretUpSolid class="w-6 h-6" slot="icon" />
    </SpeedDial>
</div>
