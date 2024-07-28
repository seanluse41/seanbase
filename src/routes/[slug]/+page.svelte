<script>
	import { Carousel, Heading, P, Video } from "flowbite-svelte";
	export let data;
	let images = [];
	images.push({
		src: data.imageURL,
		title: data.title,
		alt: data.description,
	});
	data.detailImages.forEach((object) => {
		images.push({
			src: object.url,
			title: object.name,
			alt: object.name,
		});
	});
</script>

<Carousel imgClass="object-contain h-full w-fit rounded-sm" {images} let:Indicators let:Controls duration={3000}>
	<Controls />
	<Indicators />
</Carousel>
<Heading class="mb-10 mt-10">{data.title.value}</Heading>
<P>{data.longDescription.value}</P>
{#if data.videos.length > 0}
	<Video src={data.videos[0].url} controls trackSrc={data.videos[0].name} class="mt-10" />
{/if}

<P class="mt-10">{data.longDescription2.value}</P>