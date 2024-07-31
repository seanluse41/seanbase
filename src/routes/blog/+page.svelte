<script>
	import { Card, P, Heading } from "flowbite-svelte";
	import { SyncLoader } from "svelte-loading-spinners";
	import { blogStore } from "../../stores/blogPosts.js";

	const getPosts = async () => {
		const blogRequest = await fetch("/blog", {
			method: "GET",
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
			},
		});
		const posts = await blogRequest.json();
		blogStore.set(posts);
		return posts;
	};
</script>

<div class="blogMain">
	{#await getPosts()}
		<div class="loadingContainer">
			<SyncLoader size="200" color="#8c86aa" unit="px" duration="1s" />
		</div>
	{:then posts}
		{#each posts as post}
			<Card class="mb-10" href={`/blog/${post.Record_number.value}`}>
				<Heading>{post.title.value}</Heading>
				<P>{post.description.value}</P>
			</Card>
		{/each}
	{/await}
</div>

<style>
	.blogMain {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0% 5%;
		margin-top: 24px;
	}
</style>
