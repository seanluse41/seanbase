// /src/routes/blog/[slug]/+page.js
import { get } from 'svelte/store';
import { blogStore } from '../../../stores/blogPosts.js';

export const load = async ({ params, fetch }) => {
    let blogPosts = get(blogStore);
    let post = await getPost(params.slug, fetch, blogPosts);
    if (post.detailImages.value.length > 0 && !post.detailImagesStore) {
        // Only fetch images if this is not a preload request
        let images = await getFiles(params.slug, fetch);
        post.detailImagesStore = images;
        // Update the blogStore with the new post data
        blogStore.update(posts => {
            const index = posts.findIndex(p => p.Record_number.value === params.slug);
            if (index !== -1) {
                posts[index] = post;
            } else {
                posts.push(post);
            }
            return posts;
        });
    }
    return { post };
}

// Gets the post the user is navigating to, first checks the store.
// If not found (usually from direct browser navigation to the blog post in question)
// Fetches blog post from DB
const getPost = async (id, fetch, blogPosts) => {
    let blogPost = blogPosts.find(post => post.Record_number.value === id);
    if (!blogPost) {
        const response = await fetch(`/blog?id=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        blogPost = await response.json();
    }
    return { ...blogPost };
}

const getFiles = async (recordID, fetch) => {
    let files = [];
    const fileRequest = await fetch("/getImages", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ recordID: recordID, path: "blog" }),
    });

    if (fileRequest.status === 200) {
        files = await fileRequest.json();
    }
    return files;
};