import { s as subscribe, i as is_promise, n as noop, g as get_store_value } from "../../chunks/utils.js";
import { c as create_ssr_component, d as add_attribute, f as escape, v as validate_component, h as each } from "../../chunks/ssr.js";
import { $ as $format } from "../../chunks/runtime.js";
import { H as Heading } from "../../chunks/Heading.js";
import { P } from "../../chunks/P.js";
import { C as Card } from "../../chunks/Card.js";
import { twMerge } from "tailwind-merge";
import { L as Loader } from "../../chunks/loader.js";
import { p as projectsStore } from "../../chunks/projects.js";
const ImagePlaceholder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let imgOnlyClass;
  let { divClass = "space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center" } = $$props;
  let { imgHeight = "48" } = $$props;
  let { imgOnly = false } = $$props;
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.imgHeight === void 0 && $$bindings.imgHeight && imgHeight !== void 0) $$bindings.imgHeight(imgHeight);
  if ($$props.imgOnly === void 0 && $$bindings.imgOnly && imgOnly !== void 0) $$bindings.imgOnly(imgOnly);
  imgOnlyClass = imgOnly ? "max-w-60" : "";
  return `<div role="status"${add_attribute("class", twMerge(divClass, $$props.class, imgOnlyClass), 0)}><div class="${"flex justify-center items-center w-full h-" + escape(imgHeight, true) + " bg-gray-300 rounded sm:w-96 " + escape(imgOnlyClass, true) + " dark:bg-gray-700"}"><svg width="48" height="48" class="text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path></svg></div> ${!imgOnly ? `<div class="w-full" data-svelte-h="svelte-1l75rvy"><div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div> <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12 mb-2.5"></div> <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div> <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div> <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-10/12 mb-2.5"></div> <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-11/12 mb-2.5"></div> <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-9/12"></div></div>` : ``} <span class="sr-only" data-svelte-h="svelte-1wtojot">Loading...</span></div> `;
});
const css = {
  code: ".imageFrame.svelte-18j54vf{display:flex;justify-content:center}",
  map: '{"version":3,"file":"projectCard.svelte","sources":["projectCard.svelte"],"sourcesContent":["<script>\\n  import { _ } from \\"svelte-i18n\\";\\n  import { Card, ImagePlaceholder, P } from \\"flowbite-svelte\\";\\n  export let title;\\n  export let type;\\n  export let description;\\n  export let link;\\n  export let imageURL;\\n<\/script>\\n\\n<div class=\\"space-y-4 mt-4 mb-4 mr-8 hover:scale-105 transition ease-in-out duration-150\\">\\n    <Card class=\\"!p-0 h-[350px] w-80 flex flex-col\\" href={`/${link}`}>\\n      {#if imageURL}\\n        <div class=\\"imageFrame h-48\\">\\n          <img class=\\"p-0 rounded-t-lg h-full w-full object-cover\\" src={imageURL} alt={title} />          \\n        </div>\\n      {:else}\\n        <div class=\\"h-48\\">\\n          <ImagePlaceholder imgOnly={true} class=\\"h-full\\"/>\\n        </div>\\n      {/if}\\n      <div class=\\"flex flex-col flex-grow p-2\\">\\n        <h5 class=\\"text-2xl font-bold tracking-tight text-stone-700 mb-2\\">\\n          {$_(title)}\\n        </h5>\\n        <P class=\\"flex-grow overflow-hidden\\" color=\\"text-stone-700\\">\\n          <span class=\\"line-clamp-3\\">{$_(description)}</span>\\n        </P>\\n      </div>\\n    </Card>\\n</div>\\n\\n<style>\\n  .imageFrame {\\n    display: flex;\\n    justify-content: center;\\n  }\\n</style>"],"names":[],"mappings":"AAiCE,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MACnB"}'
};
const ProjectCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  let { title } = $$props;
  let { type } = $$props;
  let { description } = $$props;
  let { link } = $$props;
  let { imageURL } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);
  if ($$props.imageURL === void 0 && $$bindings.imageURL && imageURL !== void 0) $$bindings.imageURL(imageURL);
  $$result.css.add(css);
  $$unsubscribe__();
  return `<div class="space-y-4 mt-4 mb-4 mr-8 hover:scale-105 transition ease-in-out duration-150">${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "!p-0 h-[350px] w-80 flex flex-col",
      href: `/${link}`
    },
    {},
    {
      default: () => {
        return `${imageURL ? `<div class="imageFrame h-48 svelte-18j54vf"><img class="p-0 rounded-t-lg h-full w-full object-cover"${add_attribute("src", imageURL, 0)}${add_attribute("alt", title, 0)}></div>` : `<div class="h-48">${validate_component(ImagePlaceholder, "ImagePlaceholder").$$render($$result, { imgOnly: true, class: "h-full" }, {}, {})}</div>`} <div class="flex flex-col flex-grow p-2"><h5 class="text-2xl font-bold tracking-tight text-stone-700 mb-2">${escape($_(title))}</h5> ${validate_component(P, "P").$$render(
          $$result,
          {
            class: "flex-grow overflow-hidden",
            color: "text-stone-700"
          },
          {},
          {
            default: () => {
              return `<span class="line-clamp-3">${escape($_(description))}</span>`;
            }
          }
        )}</div>`;
      }
    }
  )} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_, $$unsubscribe__;
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  const getImage = async (recordID) => {
    let imageURL;
    const imageRequest = await fetch("/getImage", {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ recordID })
    });
    if (imageRequest.status == 200) {
      let imageBlob = await imageRequest.blob();
      imageURL = URL.createObjectURL(imageBlob);
    } else {
      imageURL = null;
    }
    return imageURL;
  };
  const getProjects = async () => {
    let projects = get_store_value(projectsStore);
    if (projects.length > 0) {
      return projects;
    }
    const projectRequest = await fetch("/", {
      method: "GET",
      credentials: "same-origin",
      headers: { "content-type": "application/json" }
    });
    projects = await projectRequest.json();
    for (const project of projects) {
      if (!project.imageURL && project.image.value.length > 0) {
        let imageURL = await getImage(project.Record_number.value);
        project.imageURL = imageURL;
      }
      if (!project.detailImagesStore) {
        project.detailImagesStore = [];
      }
    }
    projectsStore.set(projects);
    return projects;
  };
  let projectsPromise = getProjects();
  $$unsubscribe__();
  return `  <div>${validate_component(Heading, "Heading").$$render(
    $$result,
    {
      tag: "h1",
      class: "mt-8 mb-10 text-stone-700",
      customSize: "text-4xl font-extrabold  md:text-5xl lg:text-6xl"
    },
    {},
    {
      default: () => {
        return `${escape($_("main_name"))}`;
      }
    }
  )} ${validate_component(P, "P").$$render(
    $$result,
    {
      class: "mb-6 text-lg lg:text-xl text-stone-700"
    },
    {},
    {
      default: () => {
        return `${escape($_("main_subtitle"))}`;
      }
    }
  )} ${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` ${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})} `;
    }
    return function(projects) {
      return ` <div class="flex flex-row flex-wrap">${each(projects, (project, i) => {
        return `<div>${validate_component(ProjectCard, "ProjectCard").$$render(
          $$result,
          {
            title: project.title.value,
            description: project.description.value,
            type: project.type.value,
            link: project.link.value,
            imageURL: project.imageURL
          },
          {},
          {}
        )} </div>`;
      })}</div> `;
    }(__value);
  }(projectsPromise)}</div>`;
});
export {
  Page as default
};
