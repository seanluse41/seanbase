import { g as get_store_value } from "../../../../chunks/utils.js";
import { b as blogStore } from "../../../../chunks/blogPosts.js";
const load = async ({ params, fetch }) => {
  let blogPosts = get_store_value(blogStore);
  let post = await getPost(params.slug, fetch, blogPosts);
  if (post.detailImages.value.length > 0 && !post.detailImagesStore) {
    let images = await getFiles(params.slug, fetch);
    post.detailImagesStore = images;
    blogStore.update((posts) => {
      const index = posts.findIndex((p) => p.Record_number.value === params.slug);
      if (index !== -1) {
        posts[index] = post;
      } else {
        posts.push(post);
      }
      return posts;
    });
  }
  return { post };
};
const getPost = async (id, fetch, blogPosts) => {
  let blogPost = blogPosts.find((post) => post.Record_number.value === id);
  if (!blogPost) {
    const response = await fetch(`/blog?id=${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    blogPost = await response.json();
  }
  return { ...blogPost };
};
const getFiles = async (recordID, fetch) => {
  let files = [];
  const fileRequest = await fetch("/getImages", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ recordID, path: "blog" })
  });
  if (fileRequest.status === 200) {
    files = await fileRequest.json();
  }
  return files;
};
export {
  load
};
