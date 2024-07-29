<script>
    import { P } from "flowbite-svelte";
    import { onMount } from "svelte";
    import DetailPageHeading from "../../components/detailPageHeading.svelte";
    import DetailPageRelatedInfo from "../../components/detailPageRelatedInfo.svelte";

    import Loader from "../../components/loader.svelte";
    import DetailPageCarousel from "../../components/detailPageCarousel.svelte";
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
    <DetailPageCarousel images={images} />
        <DetailPageHeading
            title={project.title.value}
            githubLink={project.github.value}
        />
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
        <P class="mt-10 mb-10">{project.longDescription2.value}</P>
        {#if project.linkBox.value.length > 0}
            <DetailPageRelatedInfo linkBox={project.linkBox.value} />
        {/if}
    {:else}
        <Loader />
    {/if}
{:else}
    <p>Loading project...</p>
{/if}
