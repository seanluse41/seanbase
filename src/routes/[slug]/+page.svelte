<script>
    import { P, Card } from "flowbite-svelte";
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
            const mainImage = {
                src: project.imageURL,
                title: project.title.value,
                alt: project.description.value,
            };
            const detailImages = project.detailImagesStore.map((file) => {
                const blob = new Blob([new Uint8Array(file.data)], {
                    type: file.contentType,
                });
                return {
                    src: URL.createObjectURL(blob),
                    title: file.name,
                    alt: file.name,
                };
            });

            images = [mainImage, ...detailImages];
            await Promise.all(images.map((img) => loadImage(img.src)));
            imagesLoaded = true;
        }
    });

    const loadImage = (src) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
</script>

{#if project}
    <div class="mt-8">
        {#if imagesLoaded}
                <DetailPageCarousel {images} />
                <DetailPageHeading
                    title={project.title.value}
                    githubLink={project.github.value}
                />
                <Card size="lg" class="mt-8 max-w-max lg:p-24">
                <P class="lg:text-2xl">{project.longDescription.value}</P>
                {#if project.youtube.value}
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
                <P class="mt-10 mb-10 lg:text-2xl">{@html project.longDescription3.value}</P
                >
                {#if project.linkBox.value.length}
                    <DetailPageRelatedInfo linkBox={project.linkBox.value} />
                {/if}
            </Card>
        {:else}
            <Loader />
        {/if}
    </div>
{:else}
    <p>Loading project...</p>
{/if}
