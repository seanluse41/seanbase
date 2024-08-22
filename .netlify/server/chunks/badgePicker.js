import { c as create_ssr_component, v as validate_component, d as add_attribute, i as createEventDispatcher, a as spread, b as escape_object, e as escape_attribute_value, f as escape } from "./ssr.js";
import { b as identity, c as compute_rest_props } from "./utils.js";
import { twMerge } from "tailwind-merge";
import { T as ToolbarButton } from "./ToolbarButton.js";
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
const CloseButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name"]);
  let { name = "Close" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name }, $$restProps, { class: twMerge("ms-auto", $$props.class) }), {}, {
    default: ({ svgSize }) => {
      return `<svg${add_attribute("class", svgSize, 0)} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;
    }
  })} `;
});
const baseClass = "font-medium inline-flex items-center justify-center px-2.5 py-0.5";
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["color", "large", "dismissable", "border", "href", "rounded", "transition", "params"]);
  createEventDispatcher();
  let { color = "primary" } = $$props;
  let { large = false } = $$props;
  let { dismissable = false } = $$props;
  let { border = false } = $$props;
  let { href = "" } = $$props;
  let { rounded = false } = $$props;
  let { transition = fade } = $$props;
  let { params = {} } = $$props;
  let badgeStatus = true;
  const colors = {
    primary: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    none: ""
  };
  const borderedColors = {
    primary: "bg-primary-100 text-primary-800 dark:bg-gray-700 dark:text-primary-400 border-primary-400 dark:border-primary-400",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border-gray-400 dark:border-gray-400",
    blue: "bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-blue-400 border-blue-400 dark:border-blue-400",
    red: "bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border-red-400 dark:border-red-400",
    green: "bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border-green-400 dark:border-green-400",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-gray-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-300",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-gray-700 dark:text-indigo-400 border-indigo-400 dark:border-indigo-400",
    purple: "bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-purple-400 border-purple-400 dark:border-purple-400",
    pink: "bg-pink-100 text-pink-800 dark:bg-gray-700 dark:text-pink-400 border-pink-400 dark:border-pink-400",
    none: ""
  };
  const hoverColors = {
    primary: "hover:bg-primary-200",
    dark: "hover:bg-gray-200",
    blue: "hover:bg-blue-200",
    red: "hover:bg-red-200",
    green: "hover:bg-green-200",
    yellow: "hover:bg-yellow-200",
    indigo: "hover:bg-indigo-200",
    purple: "hover:bg-purple-200",
    pink: "hover:bg-pink-200",
    none: ""
  };
  const close = () => {
    badgeStatus = false;
  };
  let badgeClass = twMerge(
    baseClass,
    large ? "text-sm" : "text-xs",
    border ? `border ${borderedColors[color]}` : colors[color],
    href && hoverColors[color],
    rounded ? "rounded-full" : "rounded",
    $$restProps.class
  );
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.large === void 0 && $$bindings.large && large !== void 0) $$bindings.large(large);
  if ($$props.dismissable === void 0 && $$bindings.dismissable && dismissable !== void 0) $$bindings.dismissable(dismissable);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0) $$bindings.border(border);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  return `${badgeStatus ? `<div${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(badgeClass)
      }
    ],
    {}
  )}>${href ? `<a${add_attribute("href", href, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `${slots.default ? slots.default({}) : ``}`} ${dismissable ? `${slots["close-button"] ? slots["close-button"]({ close }) : ` ${validate_component(CloseButton, "CloseButton").$$render(
    $$result,
    {
      divclass: "ms-1.5 -me-1.5",
      color,
      size: large ? "sm" : "xs",
      ariaLabel: "Remove badge"
    },
    {},
    {}
  )} `}` : ``}</div>` : ``} `;
});
const BadgePicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let color;
  switch (type) {
    case "Kintone":
      color = "yellow";
      break;
    case "Gamedev":
      color = "green";
      break;
    case "Webdev":
      color = "red";
      break;
    case "Svelte":
      color = "red";
      break;
    case "Privacy":
      color = "dark";
      break;
    case "Linux":
      color = "pink";
      break;
    case "Godot":
      color = "indigo";
      break;
    case "Mobile":
      color = "purple";
      break;
    default:
      color = "default";
      break;
  }
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  return `<div class="flex justify-evenly">${validate_component(Badge, "Badge").$$render(
    $$result,
    {
      class: (color === "purple" ? "text-white" : "text-slate") + " ml-1 mb-1 font-bold",
      border: true,
      color
    },
    {},
    {
      default: () => {
        return `${escape(type)}`;
      }
    }
  )}</div>`;
});
export {
  BadgePicker as B
};
