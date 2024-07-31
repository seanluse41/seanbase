<script>
    import { onMount } from "svelte";
    import { Heading, P, Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    export let data;
    let images = [];
    let imagesLoaded = false;

    onMount(async () => {
        const detailImages = data.post.detailImagesStore.map((file) => {
            const blob = new Blob([new Uint8Array(file.data)], {
                type: file.contentType,
            });
            return {
                src: URL.createObjectURL(blob),
                title: file.name,
                alt: file.name,
            };
        });

        images = [...detailImages];
        await Promise.all(images.map((img) => loadImage(img.src)));
        imagesLoaded = true;
    });

    const loadImage = (src) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
</script>

<Breadcrumb aria-label="BreadCrumbs" class="mt-8">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
    <BreadcrumbItem>{data.post.Record_number.value}</BreadcrumbItem>
</Breadcrumb>
<Heading class="mt-8">{data.post.title.value}</Heading>
<P class="mt-8">{data.post.body.value}</P>
{#if imagesLoaded}
    <img src={images[0].src} alt="blog 1" />
{/if}
<P class="mt-8">{data.post.body2.value}</P>

{#if imagesLoaded}
    <img src={images[1].src} alt="blog 2" />
{/if}
