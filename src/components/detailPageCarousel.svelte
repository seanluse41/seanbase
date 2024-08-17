<script>
    import { Carousel, Button, Card } from "flowbite-svelte";
    import { CaretRightOutline, CaretLeftOutline } from "flowbite-svelte-icons";

    export let images;
</script>

<Card size="xl">
    <Carousel
        imgClass="object-contain h-full w-fit rounded-sm"
        {images}
        let:Indicators
        let:Controls
        duration={5000}
    >
        <Controls class="items-center text-red-400 pt-4" let:changeSlide>
            <Button
                name="Previous"
                forward={false}
                pill
                class="p-2 absolute top-1/2 -translate-y-1/2 font-bold"
                on:click={() => changeSlide(false)}><CaretLeftOutline /></Button
            >
            <Button
                name="Next"
                forward={true}
                pill
                class="p-2 absolute top-1/2 -translate-y-1/2 end-4 font-bold"
                on:click={() => changeSlide(true)}><CaretRightOutline /></Button
            >
        </Controls>
        <Indicators />
    </Carousel>
</Card>
