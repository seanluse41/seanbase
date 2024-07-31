import { get } from 'svelte/store';
import { blogStore } from '../../../stores/blogPosts.js';

export const load = async ({ params, fetch }) => {
    let blogPosts = get(blogStore);
    let post = await getPost(params.slug, fetch, blogPosts)
    if (post.detailImages.value.length > 0) {
        let images = await getFiles(params.slug, fetch);
        post.detailImagesStore = images;
    }
    return { post }
}

const getPost = async (id, fetch, blogPosts) => {
    let blogPostIndex = await blogPosts.findIndex(post => post.Record_number.value === id);
    if (blogPostIndex == -1) {
        let blogPost = await getBlogPost(id, fetch)
        return blogPost
    } else {
        let blogPost = { ...blogPosts[blogPostIndex] };
        return blogPost
    }
}

const getBlogPost = async (id, fetch) => {
    let blogPostResponse = await fetch("/getBlogPost", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
    let blogPost = await blogPostResponse.json()
    return blogPost
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