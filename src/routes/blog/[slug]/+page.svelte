<script>
    import { onMount } from "svelte";
    import { Heading, P, Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import Loader from "../../../components/loader.svelte"
    import BadgePicker from "../../../components/badgePicker.svelte"
    export let data;
    let images = [];
    let imagesLoaded = false;
    let isLoading = true;

    onMount(async () => {
        if (data.post.detailImagesStore) {
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
        }
        isLoading = false;
    });

    const loadImage = (src) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });

    let image1Position = data.post.imageLocation1.value;
    let image2Position = data.post.imageLocation2.value;
</script>

<Breadcrumb aria-label="BreadCrumbs" class="mt-8">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
    <BreadcrumbItem>{data.post.Record_number.value}</BreadcrumbItem>
</Breadcrumb>
<div class="flex">
    <Heading class="mt-8">{data.post.title.value}</Heading>
    <div class="flex justify-end items-center flex-wrap">
        {#each data.post.tags.value as tag}
            <BadgePicker type={tag}/>
        {/each}
    </div>
</div>

{#if isLoading}
  <p>Loading...</p>
  <Loader />
{:else}
<P class="mt-8">{@html data.post.blogIntro.value}</P>

<div class="mt-8 flex flex-col md:flex-row gap-4">
    <div class="flex-1 flex flex-col md:flex-row gap-4 {image1Position === 'left' ? 'md:flex-row-reverse' : ''}">
        <div class="flex-1">
            <P>{data.post.body.value}</P>
        </div>
        {#if imagesLoaded}
            <img
                src={images[0].src}
                alt="blog 1"
                class="w-full md:w-1/3 h-auto object-cover"
            />
        {/if}
    </div>
</div>

<div class="mt-8 flex flex-col md:flex-row gap-4">
    <div class="flex-1 flex flex-col md:flex-row gap-4 {image2Position === 'left' ? 'md:flex-row-reverse' : ''}">
        <div class="flex-1">
            <P>{data.post.body2.value}</P>
        </div>
        {#if imagesLoaded}
            <img
                src={images[1].src}
                alt="blog 2"
                class="w-full md:w-1/3 h-auto object-cover"
            />
        {/if}
    </div>
</div>
{/if}