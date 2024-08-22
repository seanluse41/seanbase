import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/runtime.js";
import { L as Loader } from "../../../chunks/loader.js";
import "../../../chunks/client.js";
import "@stripe/stripe-js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { project } = data;
  if (project.sale.value.length > 0) {
    project.sale.value[0];
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${project ? `<div class="mt-8">${`${validate_component(Loader, "Loader").$$render($$result, {}, {}, {})}`}</div>` : `<p data-svelte-h="svelte-db1ml3">Loading project...</p>`}`;
});
export {
  Page as default
};
