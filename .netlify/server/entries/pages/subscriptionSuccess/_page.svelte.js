import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, f as escape } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { $ as $format } from "../../../chunks/runtime.js";
import { P } from "../../../chunks/P.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $_, $$unsubscribe__;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  $$unsubscribe_page();
  $$unsubscribe__();
  return `<div class="container mx-auto px-4 py-8">${`${validate_component(P, "P").$$render($$result, {}, {}, {
    default: () => {
      return `${escape($_("subscriptionSuccess.noData"))}`;
    }
  })}`}</div>`;
});
export {
  Page as default
};
