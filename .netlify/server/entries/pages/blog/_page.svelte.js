import { i as is_promise, n as noop, g as get_store_value } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, h as each, f as escape } from "../../../chunks/ssr.js";
import { C as Card } from "../../../chunks/Card.js";
import { H as Heading } from "../../../chunks/Heading.js";
import { P } from "../../../chunks/P.js";
import { L as Loader } from "../../../chunks/loader.js";
import { b as blogStore } from "../../../chunks/blogPosts.js";
import { B as BadgePicker } from "../../../chunks/badgePicker.js";
const css = {
  code: ".blogMain.svelte-7oosq3{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0% 5%;margin-top:2.5rem}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport { Card, P, Heading } from \\"flowbite-svelte\\";\\n\\timport Loader from \\"../../components/loader.svelte\\";\\n\\timport { blogStore } from \\"../../stores/blogPosts.js\\";\\n\\timport { get } from \\"svelte/store\\";\\n\\timport BadgePicker from \\"../../components/badgePicker.svelte\\";\\n\\n\\tlet postsPromise;\\n\\n\\tconst getPosts = async () => {\\n\\t\\t// First, check if we have posts in the store\\n\\t\\tlet posts = get(blogStore);\\n\\t\\tif (posts && posts.length > 1) {\\n\\t\\t\\treturn posts;\\n\\t\\t} else {\\n\\t\\t\\tconst blogRequest = await fetch(\\"/blog\\", {\\n\\t\\t\\t\\tmethod: \\"GET\\",\\n\\t\\t\\t\\tcredentials: \\"same-origin\\",\\n\\t\\t\\t\\theaders: {\\n\\t\\t\\t\\t\\t\\"content-type\\": \\"application/json\\",\\n\\t\\t\\t\\t},\\n\\t\\t\\t});\\n\\t\\t\\tposts = await blogRequest.json();\\n\\t\\t\\tblogStore.set(posts);\\n\\t\\t\\treturn posts;\\n\\t\\t}\\n\\t};\\n\\t// Initialize the promise\\n\\tpostsPromise = getPosts();\\n\\tfunction formatDate(dateString) {\\n\\t\\tconst options = { year: \\"numeric\\", month: \\"long\\", day: \\"numeric\\" };\\n\\t\\treturn new Date(dateString).toLocaleDateString(undefined, options);\\n\\t}\\n<\/script>\\n\\n<div class=\\"blogMain\\">\\n\\t{#await postsPromise}\\n\\t\\t<Loader />\\n\\t{:then posts}\\n\\t\\t{#each posts as post}\\n\\t\\t\\t<Card\\n\\t\\t\\t\\tsize=\\"lg\\"\\n\\t\\t\\t\\tclass=\\"mb-10\\"\\n\\t\\t\\t\\thref={`/blog/${post.Record_number.value}`}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div class=\\"flex justify-between items-center mb-4\\">\\n\\t\\t\\t\\t\\t<Heading\\n\\t\\t\\t\\t\\t\\tclass=\\"font-bold leading-none text-gray-900 dark:text-white\\"\\n\\t\\t\\t\\t\\t\\t>{post.title.value}</Heading\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"flex justify-end flex-wrap\\">\\n\\t\\t\\t\\t\\t\\t{#each post.tags.value as tag}\\n\\t\\t\\t\\t\\t\\t\\t<BadgePicker type={tag} />\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<P>{post.description.value}</P>\\n\\t\\t\\t\\t<P class=\\"self-end\\">Updated: {formatDate(post.updatedTime.value)}</P>\\n\\t\\t\\t</Card>\\n\\t\\t{/each}\\n\\t{/await}\\n</div>\\n\\n<style>\\n\\t.blogMain {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0% 5%;\\n\\t\\tmargin-top: 2.5rem;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAgEC,uBAAU,CACT,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,EAAE,CAAC,EAAE,CACd,UAAU,CAAE,MACb"}'
};
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(dateString).toLocaleDateString(void 0, options);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let postsPromise;
  const getPosts = async () => {
    let posts = get_store_value(blogStore);
    if (posts && posts.length > 1) {
      return posts;
    } else {
      const blogRequest = await fetch("/blog", {
        method: "GET",
        credentials: "same-origin",
        headers: { "content-type": "application/json" }
      });
      posts = await blogRequest.json();
      blogStore.set(posts);
      return posts;
    }
  };
  postsPromise = getPosts();
  $$result.css.add(css);
  return `<div class="blogMain svelte-7oosq3">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` ${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})} `;
    }
    return function(posts) {
      return ` ${each(posts, (post) => {
        return `${validate_component(Card, "Card").$$render(
          $$result,
          {
            size: "lg",
            class: "mb-10",
            href: `/blog/${post.Record_number.value}`
          },
          {},
          {
            default: () => {
              return `<div class="flex justify-between items-center mb-4">${validate_component(Heading, "Heading").$$render(
                $$result,
                {
                  class: "font-bold leading-none text-gray-900 dark:text-white"
                },
                {},
                {
                  default: () => {
                    return `${escape(post.title.value)}`;
                  }
                }
              )} <div class="flex justify-end flex-wrap">${each(post.tags.value, (tag) => {
                return `${validate_component(BadgePicker, "BadgePicker").$$render($$result, { type: tag }, {}, {})}`;
              })} </div></div> ${validate_component(P, "P").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(post.description.value)}`;
                }
              })} ${validate_component(P, "P").$$render($$result, { class: "self-end" }, {}, {
                default: () => {
                  return `Updated: ${escape(formatDate(post.updatedTime.value))}`;
                }
              })} `;
            }
          }
        )}`;
      })} `;
    }(__value);
  }(postsPromise)} </div>`;
});
export {
  Page as default
};
