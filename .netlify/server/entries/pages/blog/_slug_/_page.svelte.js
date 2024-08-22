import { c as create_ssr_component, a as spread, e as escape_attribute_value, b as escape_object, d as add_attribute, v as validate_component, f as escape, h as each } from "../../../../chunks/ssr.js";
import { c as compute_rest_props, a as compute_slots } from "../../../../chunks/utils.js";
import { twMerge } from "tailwind-merge";
import { H as Heading } from "../../../../chunks/Heading.js";
import { P } from "../../../../chunks/P.js";
import { L as Loader } from "../../../../chunks/loader.js";
import { B as BadgePicker } from "../../../../chunks/badgePicker.js";
const Breadcrumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["solid", "navClass", "solidClass", "olClass", "ariaLabel"]);
  let { solid = false } = $$props;
  let { navClass = "flex" } = $$props;
  let { solidClass = "flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" } = $$props;
  let { olClass = "inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3 rtl:space-x-reverse" } = $$props;
  let { ariaLabel = "Breadcrumb" } = $$props;
  let classNav = solid ? solidClass : navClass;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0) $$bindings.solid(solid);
  if ($$props.navClass === void 0 && $$bindings.navClass && navClass !== void 0) $$bindings.navClass(navClass);
  if ($$props.solidClass === void 0 && $$bindings.solidClass && solidClass !== void 0) $$bindings.solidClass(solidClass);
  if ($$props.olClass === void 0 && $$bindings.olClass && olClass !== void 0) $$bindings.olClass(olClass);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  return `<nav${spread(
    [
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(classNav, $$props.class))
      }
    ],
    {}
  )}><ol${add_attribute("class", twMerge(olClass, $$props.classOl), 0)}>${slots.default ? slots.default({}) : ``}</ol></nav> `;
});
const BreadcrumbItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["home", "href", "linkClass", "spanClass", "homeClass"]);
  let $$slots = compute_slots(slots);
  let { home = false } = $$props;
  let { href = void 0 } = $$props;
  let { linkClass = "ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white" } = $$props;
  let { spanClass = "ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400" } = $$props;
  let { homeClass = "inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" } = $$props;
  if ($$props.home === void 0 && $$bindings.home && home !== void 0) $$bindings.home(home);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.linkClass === void 0 && $$bindings.linkClass && linkClass !== void 0) $$bindings.linkClass(linkClass);
  if ($$props.spanClass === void 0 && $$bindings.spanClass && spanClass !== void 0) $$bindings.spanClass(spanClass);
  if ($$props.homeClass === void 0 && $$bindings.homeClass && homeClass !== void 0) $$bindings.homeClass(homeClass);
  return `<li${spread(
    [
      {
        class: escape_attribute_value(twMerge("inline-flex items-center", $$props.class))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${home ? `<a${add_attribute("class", twMerge(homeClass, $$props.classHome), 0)}${add_attribute("href", href, 0)}>${$$slots.icon ? `${slots.icon ? slots.icon({}) : ``}` : `<svg class="w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>`} ${slots.default ? slots.default({}) : ``}</a>` : `${$$slots.icon ? `${slots.icon ? slots.icon({}) : ``}` : `<svg class="w-6 h-6 text-gray-400 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`} ${href ? `<a${add_attribute("class", twMerge(linkClass, $$props.classLink), 0)}${add_attribute("href", href, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `<span${add_attribute("class", twMerge(spanClass, $$props.classSpan), 0)}>${slots.default ? slots.default({}) : ``}</span>`}`}</li> `;
});
const css = {
  code: ".blog-link{color:#2563eb;text-decoration:underline !important}.blog-link:hover{text-decoration:underline}.blog-link:visited{color:purple;text-decoration:underline}.image-enlarger{width:100%;max-width:100%;height:auto;-o-object-fit:contain;object-fit:contain}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import { onMount } from \\"svelte\\";\\n    import {\\n        Heading,\\n        P,\\n        Breadcrumb,\\n        BreadcrumbItem,\\n        Card,\\n        Hr,\\n    } from \\"flowbite-svelte\\";\\n    import Loader from \\"../../../components/loader.svelte\\";\\n    import BadgePicker from \\"../../../components/badgePicker.svelte\\";\\n    import ImageEnlarger from \\"../../../components/ImageEnlarger.svelte\\";\\n\\n    export let data;\\n    let images = [];\\n    let imagesLoaded = false;\\n    let isLoading = true;\\n\\n    onMount(async () => {\\n        if (data.post.detailImagesStore) {\\n            images = data.post.detailImagesStore.map((file) => {\\n                const blob = new Blob([new Uint8Array(file.data)], {\\n                    type: file.contentType,\\n                });\\n                return {\\n                    src: URL.createObjectURL(blob),\\n                    title: file.name,\\n                    alt: file.name,\\n                };\\n            });\\n            try {\\n                await Promise.all(images.map((img) => loadImage(img.src)));\\n                imagesLoaded = true;\\n            } catch (error) {\\n                console.error(\\"Error loading images:\\", error);\\n            } finally {\\n                isLoading = false;\\n            }\\n        } else {\\n            isLoading = false;\\n        }\\n    });\\n\\n    const loadImage = (src) =>\\n        new Promise((resolve, reject) => {\\n            const img = new Image();\\n            img.onload = resolve;\\n            img.onerror = reject;\\n            img.src = src;\\n        });\\n\\n    let processHtml = (html) => {\\n        const div = document.createElement(\\"div\\");\\n        div.innerHTML = html;\\n\\n        const links = div.getElementsByTagName(\\"a\\");\\n        for (let link of links) {\\n            link.classList.add(\\"blog-link\\");\\n            if (link.href) {\\n                try {\\n                    link.href = decodeURIComponent(link.href);\\n                } catch (e) {\\n                    console.error(\\"Error decoding URL:\\", e);\\n                }\\n            }\\n        }\\n        return div.innerHTML;\\n    };\\n\\n    function formatDate(dateString) {\\n        const options = { year: \\"numeric\\", month: \\"long\\", day: \\"numeric\\" };\\n        return new Date(dateString).toLocaleDateString(undefined, options);\\n    }\\n\\n    let image1Position = data.post.imageLocation1.value;\\n    let image2Position = data.post.imageLocation2.value;\\n<\/script>\\n\\n<Breadcrumb aria-label=\\"BreadCrumbs\\" class=\\"mt-8\\">\\n    <BreadcrumbItem href=\\"/\\" home>Home</BreadcrumbItem>\\n    <BreadcrumbItem href=\\"/blog\\">Blog</BreadcrumbItem>\\n    <BreadcrumbItem>{data.post.Record_number.value}</BreadcrumbItem>\\n</Breadcrumb>\\n<div class=\\"flex\\">\\n    <Heading class=\\"mt-8 text-slate-900\\">{data.post.title.value}</Heading>\\n    <div class=\\"flex justify-end items-center flex-wrap md:mr-8\\">\\n        {#each data.post.tags.value as tag}\\n            <BadgePicker type={tag} />\\n        {/each}\\n        <P class=\\"self-end\\">Updated: {formatDate(data.post.updatedTime.value)}</P>\\n\\n    </div>\\n</div>\\n\\n{#if isLoading}\\n    <p>Loading...</p>\\n    <Loader />\\n{:else}\\n    <Card size=\\"lg\\" class=\\"mt-8 max-w-max lg:p-24\\">\\n        <P class=\\"mt-8 text-slate-900 lg:text-2xl\\"\\n            >{@html processHtml(data.post.blogIntro.value)}</P\\n        >\\n        <Hr classHr=\\"my-8\\" />\\n\\n        <!-- First image and text section -->\\n        <div class=\\"mt-8 flex flex-col md:flex-row gap-4\\">\\n            <div\\n                class=\\"flex-1 {image1Position === 'left'\\n                    ? 'md:order-last'\\n                    : ''}\\"\\n            >\\n                <P class=\\"text-slate-900 lg:text-2xl\\">{data.post.body.value}</P>\\n            </div>\\n            {#if imagesLoaded && images.length > 0}\\n                <div class=\\"flex-1 flex justify-center items-center\\">\\n                    <ImageEnlarger\\n                        src={images[0].src}\\n                        alt={images[0].alt}\\n                        title={images[0].title}\\n                    />\\n                </div>\\n            {/if}\\n        </div>\\n        <Hr classHr=\\"my-8\\" />\\n\\n        <!-- Second image and text section -->\\n        <div class=\\"mt-8 flex flex-col md:flex-row gap-4\\">\\n            <div\\n                class=\\"flex-1 {image2Position === 'left'\\n                    ? 'md:order-last'\\n                    : ''}\\"\\n            >\\n                <P class=\\"text-slate-900 lg:text-2xl\\">{data.post.body2.value}</P\\n                >\\n            </div>\\n            {#if imagesLoaded && images.length > 1}\\n                <div class=\\"flex-1 flex justify-center items-center\\">\\n                    <ImageEnlarger\\n                        src={images[1].src}\\n                        alt={images[1].alt}\\n                        title={images[1].title}\\n                    />\\n                </div>\\n            {/if}\\n        </div>\\n        <Hr classHr=\\"my-8\\" />\\n        <P class=\\"mt-8 text-slate-900 lg:text-2xl\\"\\n            >{@html processHtml(data.post.ending.value)}</P\\n        >\\n    </Card>\\n{/if}\\n\\n<style>\\n    :global(.blog-link) {\\n        color: #2563eb; /* blue-600 */\\n        text-decoration: underline !important;\\n    }\\n    :global(.blog-link:hover) {\\n        text-decoration: underline;\\n    }\\n    :global(.blog-link:visited) {\\n        color: purple;\\n        text-decoration: underline;\\n    }\\n    :global(.image-enlarger) {\\n        width: 100%;\\n        max-width: 100%;\\n        height: auto;\\n        -o-object-fit: contain;\\n           object-fit: contain;\\n    }\\n</style>\\n"],"names":[],"mappings":"AA0JY,UAAY,CAChB,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,SAAS,CAAC,UAC/B,CACQ,gBAAkB,CACtB,eAAe,CAAE,SACrB,CACQ,kBAAoB,CACxB,KAAK,CAAE,MAAM,CACb,eAAe,CAAE,SACrB,CACQ,eAAiB,CACrB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,OAAO,CACnB,UAAU,CAAE,OACnB"}`
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
  let { data } = $$props;
  data.post.imageLocation1.value;
  data.post.imageLocation2.value;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  return `${validate_component(Breadcrumb, "Breadcrumb").$$render(
    $$result,
    {
      "aria-label": "BreadCrumbs",
      class: "mt-8"
    },
    {},
    {
      default: () => {
        return `${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render($$result, { href: "/", home: true }, {}, {
          default: () => {
            return `Home`;
          }
        })} ${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render($$result, { href: "/blog" }, {}, {
          default: () => {
            return `Blog`;
          }
        })} ${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(data.post.Record_number.value)}`;
          }
        })}`;
      }
    }
  )} <div class="flex">${validate_component(Heading, "Heading").$$render($$result, { class: "mt-8 text-slate-900" }, {}, {
    default: () => {
      return `${escape(data.post.title.value)}`;
    }
  })} <div class="flex justify-end items-center flex-wrap md:mr-8">${each(data.post.tags.value, (tag) => {
    return `${validate_component(BadgePicker, "BadgePicker").$$render($$result, { type: tag }, {}, {})}`;
  })} ${validate_component(P, "P").$$render($$result, { class: "self-end" }, {}, {
    default: () => {
      return `Updated: ${escape(formatDate(data.post.updatedTime.value))}`;
    }
  })}</div></div> ${`<p data-svelte-h="svelte-qdsr2u">Loading...</p> ${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}`;
});
export {
  Page as default
};
