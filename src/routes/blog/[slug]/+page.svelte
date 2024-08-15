<script>
    import { onMount } from "svelte";
    import { Heading, P, Breadcrumb, BreadcrumbItem, Card, Hr } from "flowbite-svelte";
    import Loader from "../../../components/loader.svelte";
    import BadgePicker from "../../../components/badgePicker.svelte";
    import ImageEnlarger from "../../../components/ImageEnlarger.svelte";
    
    export let data;
    let images = [];
    let imagesLoaded = false;
    let isLoading = true;

    onMount(async () => {
        if (data.post.detailImagesStore) {
            images = data.post.detailImagesStore.map((file) => {
                const blob = new Blob([new Uint8Array(file.data)], {
                    type: file.contentType,
                });
                return {
                    src: URL.createObjectURL(blob),
                    title: file.name,
                    alt: file.name,
                };
            });

            try {
                await Promise.all(images.map((img) => loadImage(img.src)));
                imagesLoaded = true;
            } catch (error) {
                console.error("Error loading images:", error);
            } finally {
                isLoading = false;
            }
        } else {
            isLoading = false;
        }
    });

    const loadImage = (src) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });

    let processHtml = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;

        const links = div.getElementsByTagName("a");
        for (let link of links) {
            link.classList.add("blog-link");
            if (link.href) {
                try {
                    link.href = decodeURIComponent(link.href);
                } catch (e) {
                    console.error("Error decoding URL:", e);
                }
            }
        }
        return div.innerHTML;
    }

    let image1Position = data.post.imageLocation1.value;
    let image2Position = data.post.imageLocation2.value;
</script>

<Breadcrumb aria-label="BreadCrumbs" class="mt-8">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
    <BreadcrumbItem>{data.post.Record_number.value}</BreadcrumbItem>
</Breadcrumb>
<div class="flex">
    <Heading class="mt-8 text-slate-900">{data.post.title.value}</Heading>
    <div class="flex justify-end items-center flex-wrap md:mr-8">
        {#each data.post.tags.value as tag}
            <BadgePicker type={tag} />
        {/each}
    </div>
</div>

{#if isLoading}
    <p>Loading...</p>
    <Loader />
{:else}
<Card size="lg" class="mt-8 max-w-max lg:p-24">
    <P class="mt-8 text-slate-900 lg:text-2xl">{@html processHtml(data.post.blogIntro.value)}</P>
    <Hr classHr="my-8" />

    <!-- First image and text section -->
    <div class="mt-8 flex flex-col md:flex-row gap-4">
        <div class="flex-1 {image1Position === 'left' ? 'md:order-last' : ''}">
            <P class="text-slate-900 lg:text-2xl">{data.post.body.value}</P>
        </div>
        {#if imagesLoaded && images.length > 0}
            <div class="flex-1 flex justify-center items-center">
                <ImageEnlarger
                    src={images[0].src}
                    alt={images[0].alt}
                    title={images[0].title}
                />
            </div>
        {/if}
    </div>
    <Hr classHr="my-8" />

    <!-- Second image and text section -->
    <div class="mt-8 flex flex-col md:flex-row gap-4">
        <div class="flex-1 {image2Position === 'left' ? 'md:order-last' : ''}">
            <P class="text-slate-900 lg:text-2xl">{data.post.body2.value}</P>
        </div>
        {#if imagesLoaded && images.length > 1}
            <div class="flex-1 flex justify-center items-center">
                <ImageEnlarger
                    src={images[1].src}
                    alt={images[1].alt}
                    title={images[1].title}
                />
            </div>
        {/if}
    </div>
    <Hr classHr="my-8" />
    <P class="mt-8 text-slate-900 lg:text-2xl">{@html processHtml(data.post.ending.value)}</P>

</Card>
{/if}

<style>
    :global(.blog-link) {
        color: #2563eb; /* blue-600 */
        text-decoration: underline !important;
    }
    :global(.blog-link:hover) {
        text-decoration: underline;
    }
    :global(.blog-link:visited) {
        color: purple;
        text-decoration: underline;
    }
    :global(.image-enlarger) {
        width: 100%;
        height: auto;
    }
    :global(.image-enlarger) {
        max-width: 100%;
        height: auto;
        object-fit: contain;
    }
</style>