<script>
    import { P, Card, Hr } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { locale } from 'svelte-i18n';
    import DetailPageHeading from "../../../components/detailPageHeading.svelte";
    import Loader from "../../../components/loader.svelte";
    import DetailPageCarousel from "../../../components/detailPageCarousel.svelte";
    import PaymentStartCard from "../../../components/paymentStartCard.svelte";
    import RelatedBlogPosts from "../../../components/detailPageRelatedBlog.svelte"
    import DetailPageRelatedInfo from "../../../components/detailPageRelatedInfo.svelte";

    export let data;
    let { project } = data;
    let images = [];
    let imagesLoaded = false;
    let mainImage;
    let paymentCardRef;

    let forSale = false;
    if (project.sale.value.length > 0) {
        forSale = project.sale.value[0]
    }

    // Reactive declarations for localized text
    $: title = $locale === 'ja' && project.titleJA ? project.titleJA.value : project.title.value;
    $: description = $locale === 'ja' && project.descriptionJA ? project.descriptionJA.value : project.description.value;
    $: longDescription = $locale === 'ja' && project.longDescriptionJA ? project.longDescriptionJA.value : project.longDescription.value;
    $: longDescription3 = $locale === 'ja' && project.longDescription3JA ? project.longDescription3JA.value : project.longDescription3.value;

    // Update mainImage when locale changes
    $: if (project && project.imageURL) {
        mainImage = {
            src: project.imageURL,
            title: title,
            alt: description,
        };
    }

    onMount(async () => {
        if (project) {
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

            if (project.imageURL && detailImages) {
                images = [mainImage, ...detailImages];
                await Promise.all(images.map((img) => loadImage(img.src)));
            }
            if (!project.imageURL && detailImages) {
                images = [...detailImages];
                await Promise.all(images.map((img) => loadImage(img.src)));
            }
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
    const scrollToPaymentCard = () => {
        if (paymentCardRef) {
            paymentCardRef.scrollIntoView({ behavior: "smooth" });
        }
    };
</script>

{#if project}
    <div class="mt-8">
        {#if imagesLoaded}
            {#if images.length > 0}
                <DetailPageCarousel {images} />
            {/if}
            <Card size="xl" class="mt-8 max-w-none lg:p-24 lg:pt-8">
                <DetailPageHeading
                    {title}
                    githubLink={project.github.value}
                    showBuyNowButton={forSale}
                    onBuyNowClick={scrollToPaymentCard}
                />

                <P class="lg:text-2xl lg:leading-10">{@html longDescription}</P>
                {#if project.youtube.value}
                    <div class="mt-10 flex justify-center">
                        <iframe
                            width="740"
                            height="416"
                            src={project.youtube.value}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                {/if}
                <P class="mt-8 lg:text-2xl lg:leading-10">{@html longDescription3}</P>
                {#if forSale}
                    <div class="mt-8 mb-8" bind:this={paymentCardRef}>
                        <PaymentStartCard productID={project.stripeProductID.value} />
                    </div>
                {/if}
                <Hr classHr="w-full h-1 mx-auto my-8 rounded md:my-16" />

                <div class="mt-8">
                    <RelatedBlogPosts project={title} />
                </div>
                <div class="mt-8">
                    <DetailPageRelatedInfo linkBox={project.linkBox.value} />
                </div>
            </Card>
        {:else}
            <Loader />
        {/if}
    </div>
{:else}
    <p>Loading project...</p>
{/if}