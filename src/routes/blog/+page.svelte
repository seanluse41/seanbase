<script>
	import { Card, P, Heading } from "flowbite-svelte";
	import Loader from "../../components/loader.svelte"
	import { blogStore } from "../../stores/blogPosts.js";
	import { get } from "svelte/store";
    import BadgePicker from "../../components/badgePicker.svelte";

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
		<Loader />
	{:then posts}
		{#each posts as post}
			<Card size="lg" class="mb-10" href={`/blog/${post.Record_number.value}`}>
				<div class="flex justify-between items-center mb-4">
					<Heading class="font-bold leading-none text-gray-900 dark:text-white">{post.title.value}</Heading>
					<div class="flex justify-end flex-wrap">
						{#each post.tags.value as tag}
							<BadgePicker type={tag}/>
						{/each}
					</div>
				  </div>
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
		margin-top: 2.5rem;
	}
</style>
