<script>
    import { Carousel, Heading, P, Button } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { CaretRightOutline, CaretLeftOutline } from 'flowbite-svelte-icons';
    import Loader from "../../components/loader.svelte";
    export let data;
    let { project } = data;
    let images = [];
    let imagesLoaded = false;

    onMount(async () => {
        if (project) {
            const imagePromises = [
                loadImage(project.imageURL),
                ...project.detailImagesStore.map((file) => {
                    const blob = new Blob([new Uint8Array(file.data)], {
                        type: file.contentType,
                    });
                    const fileURL = URL.createObjectURL(blob);
                    return loadImage(fileURL);
                }),
            ];
            await Promise.all(imagePromises);
            images = [
                {
                    src: project.imageURL,
                    title: project.title.value,
                    alt: project.description.value,
                },
                ...project.detailImagesStore.map((file) => {
                    const blob = new Blob([new Uint8Array(file.data)], {
                        type: file.contentType,
                    });
                    const fileURL = URL.createObjectURL(blob);
                    return {
                        src: fileURL,
                        title: file.name,
                        alt: file.name,
                    };
                }),
            ];

            imagesLoaded = true;
        }
    });

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
</script>

{#if project}
    {#if imagesLoaded}
        <Carousel
            imgClass="object-contain h-full w-fit rounded-sm"
            {images}
            let:Indicators
            let:Controls
            duration={3000}
        >
            <Controls class="items-center text-red-400 pt-4" let:changeSlide>
                <Button name="Previous" forward={false} pill class="p-2 absolute top-1/2 -translate-y-1/2 font-bold" on:click={()=>changeSlide(false)}><CaretLeftOutline /></Button>
                <Button name="Next" forward={true} pill class="p-2 absolute top-1/2 -translate-y-1/2 end-4 font-bold" on:click={()=>changeSlide(true)}><CaretRightOutline /></Button>
            </Controls>
            <Indicators />
        </Carousel>
        <Heading class="mb-10 mt-10">{project.title.value}</Heading>
        <P>{project.longDescription.value}</P>
        {#if project.youtube.value != ""}
            <div class="mt-10 flex justify-center">
                <iframe
                    width="560"
                    height="315"
                    src={project.youtube.value}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        {/if}
        <P class="mt-10">{project.longDescription2.value}</P>
    {:else}
        <Loader />
    {/if}
{:else}
    <p>Loading project...</p>
{/if}
