<script>
	import { SyncLoader } from "svelte-loading-spinners";
	// A function to GET cards from our backend.
	const getPosts = async () => {
		const blogRequest = await fetch("/blog", {
			method: "GET",
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
			},
		});
		const posts = await blogRequest.json();
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
			<a href="/blog/{post.Record_number.value}">
				<div class="blogPostContainer">
					<div class="blogPostTitle">
						<h1>{post.title.value}</h1>
						<p>{post.body.value}</p>
					</div>
					<div class="blogPostImage" />
				</div>
			</a>
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
		background-color: #a4b787;
	}
	.blogMain a {
		text-decoration: none;
	}
	.loadingContainer {
		height: 100vh;
	}

	.blogPostContainer {
		display: flex;
		flex-direction: row;
		box-shadow: 4px 7px 29px 0px rgba(69, 69, 69, 0.3);
		margin: 30px;
		padding: 2%;
		background-color: bisque;
		max-height: 400px;
	}
	.blogPostContainer:hover {
		transition: all 100ms ease-in-out;
		transform: scale(1.04);
	}
	.blogPostImage {
		width: 50%;
		background: url("https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80")
			no-repeat center center;
		background-size: cover;
	}
	.blogPostTitle {
		width: 50%;
		color: black;
		margin: 1%;
		overflow: hidden;
	}
	.blogPostTitle h1 {
		font-family: "Josefin Sans", sans-serif;
	}
	@media (pointer: none), (pointer: coarse), (max-width: 600px) {
		.blogPostImage {
			display: none;
		}
		.blogPostTitle {
			width: 100%;
		}
	}

</style>