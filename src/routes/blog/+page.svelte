<script>
	import { Card, P, Heading } from "flowbite-svelte";
	import { SyncLoader } from "svelte-loading-spinners";
	import { blogStore } from "../../stores/blogPosts.js";
	import { get } from "svelte/store";

	let postsPromise;

	const getPosts = async () => {
		// First, check if we have posts in the store
		let posts = get(blogStore);
		if (posts && posts.length > 1) {
			return posts;
		} else {
			const blogRequest = await fetch("/blog", {
				method: "GET",
				credentials: "same-origin",
				headers: {
					"content-type": "application/json",
				},
			});
			posts = await blogRequest.json();
			blogStore.set(posts);
			return posts;
		}
	};
	// Initialize the promise
	postsPromise = getPosts();
</script>

<div class="blogMain">
	{#await postsPromise}
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
