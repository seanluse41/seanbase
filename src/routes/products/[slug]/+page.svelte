<script>
    import { P, Card } from "flowbite-svelte";
    import { onMount } from "svelte";
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
    onMount(async () => {
        if (project) {
            if (project.imageURL) {
                mainImage = {
                    src: project.imageURL,
                    title: project.title.value,
                    alt: project.description.value,
                };
            }
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
                    title={project.title.value}
                    githubLink={project.github.value}
                    showBuyNowButton={forSale}
                    onBuyNowClick={scrollToPaymentCard}
                />

                <P class="lg:text-2xl">{project.longDescription.value}</P>
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
                <P class="mt-8 lg:text-2xl">{@html project.longDescription3.value}</P>
                {#if forSale}
                    <div class="mt-8" bind:this={paymentCardRef}>
                        <PaymentStartCard productID={project.stripeProductID.value} />
                    </div>
                {/if}
                <div class="mt-8">
                    <RelatedBlogPosts project={project.title.value} />
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
