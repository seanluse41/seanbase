<script>
    import { Card, Listgroup } from "flowbite-svelte";
    import { _ } from "svelte-i18n";

    export let project;

    async function fetchBlogPosts() {
        const response = await fetch(`/blog?project=${encodeURIComponent(project)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        return response.json();
    }

    let blogPostsPromise = fetchBlogPosts();

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
</script>

<Card padding="xl" size="xl">
    <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold leading-none text-gray-900 dark:text-white">
            {$_("related_blog_posts")}
        </h3>
    </div>
    {#await blogPostsPromise}
        <p>Loading related blog posts...</p>
    {:then blogPosts}
        {#if blogPosts.length === 0}
            <p>No related blog posts found.</p>
        {:else}
            <Listgroup active items={blogPosts} let:item class="border-0 dark:!bg-transparent">
                <div class="flex items-center justify-between w-full">
                    <div class="flex items-center flex-grow min-w-0 flex-[3]">
                        <div class="min-w-0 ml-2 overflow-hidden">
                            <p class="text-lg text-gray-900 font-bold dark:text-white truncate">
                                {item.title?.value || 'Untitled'}
                            </p>
                        </div>
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        {#if item.updatedTime?.value}
                            Updated: {formatDate(item.updatedTime.value)}
                        {/if}
                    </div>
                </div>
            </Listgroup>
        {/if}
    {:catch error}
        <p>Error: {error.message}</p>
    {/await}
</Card>