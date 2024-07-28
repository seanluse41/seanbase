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

<Carousel {images} let:Indicators let:Controls>
	<Controls />
	<Indicators />
</Carousel>
<Heading class="mb-10 mt-10">{data.title.value}</Heading>
<P>{data.longDescription.value}</P>
{#if data.videos.length > 0}
	<Video src={data.videos[0].url} controls trackSrc={data.videos[0].name} class="mt-10" />
{/if}
