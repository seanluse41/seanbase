import { c as create_ssr_component, g as getContext, a as spread, e as escape_attribute_value, b as escape_object, d as add_attribute, s as setContext, v as validate_component, f as escape, m as missing_component } from "../../chunks/ssr.js";
import { c as compute_rest_props, s as subscribe } from "../../chunks/utils.js";
import { i as is_void } from "../../chunks/names.js";
import { twMerge } from "tailwind-merge";
import { $ as $format } from "../../chunks/runtime.js";
import { F as Frame } from "../../chunks/Frame.js";
import { w as writable } from "../../chunks/index2.js";
import { T as ToolbarButton } from "../../chunks/ToolbarButton.js";
import { n as navigating } from "../../chunks/stores.js";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
function sineIn(t) {
  const v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;
  else return 1 - v;
}
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "pill",
    "outline",
    "size",
    "href",
    "type",
    "color",
    "shadow",
    "tag",
    "checked",
    "disabled"
  ]);
  const group = getContext("group");
  let { pill = false } = $$props;
  let { outline = false } = $$props;
  let { size = group ? "sm" : "md" } = $$props;
  let { href = void 0 } = $$props;
  let { type = "button" } = $$props;
  let { color = group ? outline ? "dark" : "alternative" : "primary" } = $$props;
  let { shadow = false } = $$props;
  let { tag = "button" } = $$props;
  let { checked = void 0 } = $$props;
  let { disabled = false } = $$props;
  const colorClasses = {
    alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white dark:hover:bg-gray-700",
    blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
    dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
    green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
    light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
    primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
    purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
    red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
    yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
    none: ""
  };
  const colorCheckedClasses = {
    alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
    blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
    dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
    green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
    light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
    primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
    purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
    red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
    yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
    none: ""
  };
  const coloredFocusClasses = {
    alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
    dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
    green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
    light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
    primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
    purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
    red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
    yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
    none: ""
  };
  const coloredShadowClasses = {
    alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
    blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
    dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
    green: "shadow-green-500/50 dark:shadow-green-800/80",
    light: "shadow-gray-500/50 dark:shadow-gray-800/80",
    primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
    purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
    red: "shadow-red-500/50 dark:shadow-red-800/80 ",
    yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
    none: ""
  };
  const outlineClasses = {
    alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
    blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
    dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
    green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
    light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
    primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
    purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
    red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
    yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
    none: ""
  };
  const sizeClasses = {
    xs: "px-3 py-2 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
    xl: "px-6 py-3.5 text-base"
  };
  const hasBorder = () => outline || color === "alternative" || color === "light";
  let buttonClass;
  if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0) $$bindings.pill(pill);
  if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0) $$bindings.outline(outline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0) $$bindings.shadow(shadow);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  buttonClass = twMerge(
    "text-center font-medium",
    group ? "focus-within:ring-2" : "focus-within:ring-4",
    group && "focus-within:z-10",
    group || "focus-within:outline-none",
    "inline-flex items-center justify-center " + sizeClasses[size],
    outline && checked && "border dark:border-gray-900",
    outline && checked && colorCheckedClasses[color],
    outline && !checked && outlineClasses[color],
    !outline && checked && colorCheckedClasses[color],
    !outline && !checked && colorClasses[color],
    color === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-600"),
    outline && color === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
    coloredFocusClasses[color],
    hasBorder() && group && "[&:not(:first-child)]:-ms-px",
    group ? pill && "first:rounded-s-full last:rounded-e-full" || "first:rounded-s-lg last:rounded-e-lg" : pill && "rounded-full" || "rounded-lg",
    shadow && "shadow-lg",
    shadow && coloredShadowClasses[color],
    disabled && "cursor-not-allowed opacity-50",
    $$props.class
  );
  return `${href && !disabled ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(buttonClass)
      },
      { role: "button" }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a>` : `${tag === "button" ? `<button${spread(
    [
      { type: escape_attribute_value(type) },
      escape_object($$restProps),
      { disabled: disabled || null },
      {
        class: escape_attribute_value(buttonClass)
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</button>` : `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        escape_object($$restProps),
        {
          class: escape_attribute_value(buttonClass)
        }
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`}`} `;
});
const NavContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fluid = false } = $$props;
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
  return `<div${add_attribute("class", twMerge("mx-auto flex flex-wrap justify-between items-center ", fluid ? "w-full" : "container", $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</div> `;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fluid"]);
  let $hidden, $$unsubscribe_hidden;
  let { fluid = false } = $$props;
  let hidden = writable(true);
  $$unsubscribe_hidden = subscribe(hidden, (value) => $hidden = value);
  setContext("navHidden", hidden);
  let toggle = () => hidden.update((hidden2) => !hidden2);
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0) $$bindings.fluid(fluid);
  {
    {
      $$restProps.color = $$restProps.color ?? "navbar";
    }
  }
  $$unsubscribe_hidden();
  return `${validate_component(Frame, "Frame").$$render(
    $$result,
    Object.assign({}, { tag: "nav" }, $$restProps, {
      class: twMerge("px-2 sm:px-4 py-2.5 w-full", $$props.class)
    }),
    {},
    {
      default: () => {
        return `${validate_component(NavContainer, "NavContainer").$$render($$result, { fluid }, {}, {
          default: () => {
            return `${slots.default ? slots.default({ hidden: $hidden, toggle, NavContainer }) : ``}`;
          }
        })}`;
      }
    }
  )} `;
});
const NavBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href"]);
  let { href = "" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("flex items-center", $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a> `;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "color", "variation", "ariaLabel"]);
  let { size = "24" } = $$props;
  let { color = "currentColor" } = $$props;
  let { variation = "outline" } = $$props;
  let { ariaLabel = "bars 3" } = $$props;
  let viewBox;
  let svgpath;
  let svgoutline = `<path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path> `;
  let svgsolid = `<path fill="${color}" clip-rule="evenodd" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path> `;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.variation === void 0 && $$bindings.variation && variation !== void 0) $$bindings.variation(variation);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    switch (variation) {
      case "outline":
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
        break;
      case "solid":
        svgpath = svgsolid;
        viewBox = "0 0 24 24";
        break;
      default:
        svgpath = svgoutline;
        viewBox = "0 0 24 24";
    }
  }
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { role: "button" },
      { tabindex: "0" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      {
        class: escape_attribute_value($$props.class)
      },
      escape_object($$restProps),
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { fill: "none" },
      { viewBox: escape_attribute_value(viewBox) },
      { "stroke-width": "2" }
    ],
    {}
  )}><!-- HTML_TAG_START -->${svgpath}<!-- HTML_TAG_END --></svg> `;
});
let btnClass = "ms-3 md:hidden";
const NavHamburger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["menuClass", "onClick"]);
  let { menuClass = "h-6 w-6 shrink-0" } = $$props;
  let { onClick = void 0 } = $$props;
  getContext("navHidden") ?? writable(true);
  if ($$props.menuClass === void 0 && $$bindings.menuClass && menuClass !== void 0) $$bindings.menuClass(menuClass);
  if ($$props.onClick === void 0 && $$bindings.onClick && onClick !== void 0) $$bindings.onClick(onClick);
  return `${validate_component(ToolbarButton, "ToolbarButton").$$render($$result, Object.assign({}, { name: "Open main menu" }, $$restProps, { class: twMerge(btnClass, $$props.class) }), {}, {
    default: () => {
      return `${validate_component(Menu, "Menu").$$render(
        $$result,
        {
          class: twMerge(menuClass, $$props.classMenu)
        },
        {},
        {}
      )}`;
    }
  })} `;
});
const NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let liClass;
  let $$restProps = compute_rest_props($$props, ["href", "activeClass", "nonActiveClass"]);
  let { href = "" } = $$props;
  let { activeClass = void 0 } = $$props;
  let { nonActiveClass = void 0 } = $$props;
  const context = getContext("navbarContext") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let navUrl = "";
  activeUrlStore.subscribe((value) => {
    navUrl = value;
  });
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
  active = navUrl ? href === navUrl : false;
  liClass = twMerge(
    "block py-2 pe-4 ps-3 md:p-0 rounded md:border-0",
    active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
    $$props.class
  );
  return `<li>${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        {
          role: escape_attribute_value(href ? void 0 : "link")
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        { class: escape_attribute_value(liClass) }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}</li> `;
});
const NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeUrl",
    "divClass",
    "ulClass",
    "hidden",
    "slideParams",
    "activeClass",
    "nonActiveClass"
  ]);
  let $hiddenStore, $$unsubscribe_hiddenStore;
  const activeUrlStore = writable("");
  let { activeUrl = "" } = $$props;
  let { divClass = "w-full md:block md:w-auto" } = $$props;
  let { ulClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium" } = $$props;
  let { hidden = void 0 } = $$props;
  let { slideParams = {
    delay: 250,
    duration: 500,
    easing: sineIn
  } } = $$props;
  let { activeClass = "text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent" } = $$props;
  let { nonActiveClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" } = $$props;
  setContext("navbarContext", { activeClass, nonActiveClass });
  setContext("activeUrl", activeUrlStore);
  let hiddenStore = getContext("navHidden");
  $$unsubscribe_hiddenStore = subscribe(hiddenStore, (value) => $hiddenStore = value);
  let _hidden;
  let _divClass;
  let _ulClass;
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0) $$bindings.activeUrl(activeUrl);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0) $$bindings.divClass(divClass);
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0) $$bindings.ulClass(ulClass);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0) $$bindings.hidden(hidden);
  if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0) $$bindings.slideParams(slideParams);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0) $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0) $$bindings.nonActiveClass(nonActiveClass);
  {
    {
      activeUrlStore.set(activeUrl);
    }
  }
  _hidden = hidden ?? $hiddenStore ?? true;
  _divClass = twMerge(divClass, $$props.class);
  _ulClass = twMerge(
    ulClass,
    // 'divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700',
    $$props.classUl
  );
  $$unsubscribe_hiddenStore();
  return `${!_hidden ? `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { role: "button" },
      { tabindex: "0" }
    ],
    {}
  )}>${validate_component(Frame, "Frame").$$render(
    $$result,
    {
      tag: "ul",
      border: true,
      rounded: true,
      color: "navbarUl",
      class: _ulClass
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}</div>` : `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { hidden: _hidden || null }
    ],
    {}
  )}><ul${add_attribute("class", _ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`} `;
});
const CaretUpSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "caret up solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z" clip-rule="evenodd"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path fill-rule="evenodd" d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z" clip-rule="evenodd"></path></svg>`} `;
});
const LanguageOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "withEvents", "title", "strokeWidth", "desc", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { withEvents = ctx.withEvents || false } = $$props;
  let { title = {} } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { desc = {} } = $$props;
  let ariaDescribedby = `${title.id || ""} ${desc.id || ""}`;
  let hasDescription = false;
  let { ariaLabel = "language outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0) $$bindings.strokeWidth(strokeWidth);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0) $$bindings.desc(desc);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  {
    if (title.id || desc.id) {
      hasDescription = true;
    } else {
      hasDescription = false;
    }
  }
  return `${withEvents ? `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"></path></svg>` : `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      { color: escape_attribute_value(color) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size ?? "md"], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      {
        "aria-describedby": escape_attribute_value(hasDescription ? ariaDescribedby : void 0)
      },
      { viewBox: "0 0 24 24" }
    ],
    {}
  )}>${title.id && title.title ? `<title${add_attribute("id", title.id, 0)}>${escape(title.title)}</title>` : ``}${desc.id && desc.desc ? `<desc${add_attribute("id", desc.id, 0)}>${escape(desc.desc)}</desc>` : ``}<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${add_attribute("stroke-width", strokeWidth, 0)} d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"></path></svg>`} `;
});
const Fab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Button, "Button").$$render($$result, { pill: true, class: "!p-2" }, {}, {
    default: () => {
      return `${validate_component(CaretUpSolid, "CaretUpSolid").$$render($$result, { class: "w-6 h-6" }, {}, {})}`;
    }
  })}`;
});
const logo = "/_app/immutable/assets/logo.CEAPHGgG.svg";
const Navbar_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  let $_, $$unsubscribe__;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  $$unsubscribe__ = subscribe($format, (value) => $_ = value);
  let hamburgerMenuHidden = true;
  const toggleHamburgerMenu = () => {
    hamburgerMenuHidden = !hamburgerMenuHidden;
  };
  {
    if ($navigating) {
      hamburgerMenuHidden = true;
    }
  }
  $$unsubscribe_navigating();
  $$unsubscribe__();
  return `<div class="flex" id="top">${validate_component(Navbar, "Navbar").$$render(
    $$result,
    {
      class: "p-0 fixed w-full z-20 top-0 start-0 border-b",
      style: "background-color: #8875b5"
    },
    {},
    {
      default: () => {
        return `${validate_component(NavBrand, "NavBrand").$$render($$result, { href: "/" }, {}, {
          default: () => {
            return `<img${add_attribute("src", logo, 0)} class="w-24" alt="Purple Flower Logo">`;
          }
        })} <div class="flex md:order-2">${validate_component(Button, "Button").$$render($$result, { color: "primary", size: "sm" }, {}, {
          default: () => {
            return `${validate_component(LanguageOutline, "LanguageOutline").$$render($$result, { class: "w-6 h-6" }, {}, {})}`;
          }
        })} ${validate_component(NavHamburger, "NavHamburger").$$render($$result, { onClick: toggleHamburgerMenu }, {}, {})}</div> ${validate_component(NavUl, "NavUl").$$render($$result, { hidden: hamburgerMenuHidden }, {}, {
          default: () => {
            return `${validate_component(NavLi, "NavLi").$$render(
              $$result,
              {
                class: "text-stone-700 sm:text-white",
                href: "/blog"
              },
              {},
              {
                default: () => {
                  return `${escape($_("nav_blog"))}`;
                }
              }
            )} ${validate_component(NavLi, "NavLi").$$render(
              $$result,
              {
                class: "text-stone-700 sm:text-white",
                href: "/kintone"
              },
              {},
              {
                default: () => {
                  return `${escape($_("nav_kintone"))}`;
                }
              }
            )} ${validate_component(NavLi, "NavLi").$$render(
              $$result,
              {
                class: "text-stone-700 sm:text-white",
                href: "/gamedev"
              },
              {},
              {
                default: () => {
                  return `${escape($_("nav_gamedev"))}`;
                }
              }
            )} ${validate_component(NavLi, "NavLi").$$render(
              $$result,
              {
                class: "text-stone-700 sm:text-white",
                href: "/hire"
              },
              {},
              {
                default: () => {
                  return `${escape($_("nav_hire"))}`;
                }
              }
            )}`;
          }
        })}`;
      }
    }
  )}</div>`;
});
const initialized = writable(false);
async function particlesInit(init) {
  tsParticles.init();
  await init(tsParticles);
  initialized.set(true);
}
const particles = {
  number: {
    value: 160,
    density: {
      enable: true,
      value_area: 800
    }
  },
  color: {
    value: "#8875b5"
  },
  shape: {
    type: "circle",
    stroke: {
      width: 0,
      color: "#000000"
    },
    polygon: {
      nb_sides: 5
    }
  },
  opacity: {
    value: 0.5,
    random: true,
    anim: {
      enable: true,
      speed: 1,
      opacity_min: 0,
      sync: false
    }
  },
  size: {
    value: 3,
    random: true,
    anim: {
      enable: false,
      speed: 4,
      size_min: 0.3,
      sync: false
    }
  },
  line_linked: {
    enable: false,
    distance: 150,
    color: "#ffffff",
    opacity: 0.4,
    width: 1
  },
  move: {
    enable: true,
    speed: 1,
    direction: "none",
    random: true,
    straight: false,
    out_mode: "out",
    bounce: false,
    attract: {
      enable: false,
      rotateX: 600,
      rotateY: 600
    }
  }
};
const interactivity = {
  detect_on: "canvas",
  events: {
    onhover: {
      enable: true,
      mode: "bubble"
    },
    onclick: {
      enable: false,
      mode: "repulse"
    },
    resize: true
  },
  modes: {
    grab: {
      distance: 400,
      line_linked: {
        opacity: 1
      }
    },
    bubble: {
      distance: 250,
      size: 0,
      duration: 2,
      opacity: 0,
      speed: 3
    },
    repulse: {
      distance: 400,
      duration: 0.4
    },
    push: {
      particles_nb: 4
    },
    remove: {
      particles_nb: 2
    }
  }
};
const retina_detect = false;
const config = {
  particles,
  interactivity,
  retina_detect
};
const ParticleBackground = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let particlesConfig = config;
  void particlesInit(async (engine) => {
    await loadSlim(engine);
  });
  return `${validate_component(missing_component, "svelte:component").$$render(
    $$result,
    {
      id: "tsparticles",
      class: "",
      style: "position:absolute;z-index:0",
      options: particlesConfig
    },
    {},
    {}
  )}`;
});
const css = {
  code: ".main.svelte-h6sxqy{min-height:100vh;background-color:whitesmoke;padding:5%}.fabContainer.svelte-h6sxqy{position:fixed;right:16px;bottom:16px;z-index:20}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n    import \\"../app.pcss\\";\\n    import Fab from \\"../components/fab.svelte\\";\\n    import Navbar from \\"../components/navbar.svelte\\";\\n    import ParticleBackground from \\"../components/particleBackground.svelte\\";\\n<\/script>\\n\\n\\n<div class=\\"main\\">\\n    <ParticleBackground/>\\n    <Navbar />\\n    <div class=\\"flex flex-col mt-8 z-10 relative\\">\\n        <slot></slot>\\n    </div>\\n</div>\\n<div class=\\"fabContainer\\">\\n    <Fab/>\\n</div>\\n\\n<style>\\n    .main {\\n        min-height: 100vh;\\n        background-color: whitesmoke;\\n        padding: 5%;\\n    }\\n\\n    .fabContainer {\\n        position: fixed;\\n        right: 16px;\\n        bottom: 16px;\\n        z-index: 20;\\n    }\\n</style>"],"names":[],"mappings":"AAoBI,mBAAM,CACF,UAAU,CAAE,KAAK,CACjB,gBAAgB,CAAE,UAAU,CAC5B,OAAO,CAAE,EACb,CAEA,2BAAc,CACV,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EACb"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="main svelte-h6sxqy">${validate_component(ParticleBackground, "ParticleBackground").$$render($$result, {}, {}, {})} ${validate_component(Navbar_1, "Navbar").$$render($$result, {}, {}, {})} <div class="flex flex-col mt-8 z-10 relative">${slots.default ? slots.default({}) : ``}</div></div> <div class="fabContainer svelte-h6sxqy">${validate_component(Fab, "Fab").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Layout as default
};
