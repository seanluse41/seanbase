import { c as create_ssr_component, f as escape, h as each, v as validate_component } from "./ssr.js";
const durationUnitRegex = /[a-zA-Z]/;
const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const css$1 = {
  code: ".wrapper.svelte-kks203{height:var(--size);width:var(--size);display:flex;align-items:center;justify-content:center}.dot.svelte-kks203{height:var(--dotSize);width:var(--dotSize);background-color:var(--color);margin:2px;display:inline-block;border-radius:100%;animation:svelte-kks203-sync var(--duration) ease-in-out infinite alternate both running}.pause-animation.svelte-kks203{animation-play-state:paused}@keyframes svelte-kks203-sync{33%{transform:translateY(10px)}66%{transform:translateY(-10px)}100%{transform:translateY(0)}}",
  map: `{"version":3,"file":"SyncLoader.svelte","sources":["SyncLoader.svelte"],"sourcesContent":["<script>import { range, durationUnitRegex } from './utils';\\nexport let color = '#FF3E00';\\nexport let unit = 'px';\\nexport let duration = '0.6s';\\nexport let size = '60';\\nexport let pause = false;\\nlet durationUnit = duration.match(durationUnitRegex)?.[0] ?? 's';\\nlet durationNum = duration.replace(durationUnitRegex, '');\\n<\/script>\\n\\n<div class=\\"wrapper\\" style=\\"--size:{size}{unit}; --duration: {duration};\\">\\n\\t{#each range(3, 1) as i}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"dot\\"\\n\\t\\t\\tclass:pause-animation={pause}\\n\\t\\t\\tstyle=\\"--dotSize:{+size * 0.25}{unit}; --color:{color}; animation-delay:  {i *\\n\\t\\t\\t\\t(+durationNum / 10)}{durationUnit};\\"\\n\\t\\t/>\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.wrapper {\\n\\t\\theight: var(--size);\\n\\t\\twidth: var(--size);\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t}\\n\\n\\t.dot {\\n\\t\\theight: var(--dotSize);\\n\\t\\twidth: var(--dotSize);\\n\\t\\tbackground-color: var(--color);\\n\\t\\tmargin: 2px;\\n\\t\\tdisplay: inline-block;\\n\\t\\tborder-radius: 100%;\\n\\t\\tanimation: sync var(--duration) ease-in-out infinite alternate both running;\\n\\t}\\n\\t.pause-animation {\\n\\t\\tanimation-play-state: paused;\\n\\t}\\n\\t@keyframes sync {\\n\\t\\t33% {\\n\\t\\t\\ttransform: translateY(10px);\\n\\t\\t}\\n\\t\\t66% {\\n\\t\\t\\ttransform: translateY(-10px);\\n\\t\\t}\\n\\t\\t100% {\\n\\t\\t\\ttransform: translateY(0);\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAsBC,sBAAS,CACR,MAAM,CAAE,IAAI,MAAM,CAAC,CACnB,KAAK,CAAE,IAAI,MAAM,CAAC,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAClB,CAEA,kBAAK,CACJ,MAAM,CAAE,IAAI,SAAS,CAAC,CACtB,KAAK,CAAE,IAAI,SAAS,CAAC,CACrB,gBAAgB,CAAE,IAAI,OAAO,CAAC,CAC9B,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,YAAY,CACrB,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,kBAAI,CAAC,IAAI,UAAU,CAAC,CAAC,WAAW,CAAC,QAAQ,CAAC,SAAS,CAAC,IAAI,CAAC,OACrE,CACA,8BAAiB,CAChB,oBAAoB,CAAE,MACvB,CACA,WAAW,kBAAK,CACf,GAAI,CACH,SAAS,CAAE,WAAW,IAAI,CAC3B,CACA,GAAI,CACH,SAAS,CAAE,WAAW,KAAK,CAC5B,CACA,IAAK,CACJ,SAAS,CAAE,WAAW,CAAC,CACxB,CACD"}`
};
const SyncLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "0.6s" } = $$props;
  let { size = "60" } = $$props;
  let { pause = false } = $$props;
  let durationUnit = duration.match(durationUnitRegex)?.[0] ?? "s";
  let durationNum = duration.replace(durationUnitRegex, "");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0) $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0) $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0) $$bindings.pause(pause);
  $$result.css.add(css$1);
  return `<div class="wrapper svelte-kks203" style="${"--size:" + escape(size, true) + escape(unit, true) + "; --duration: " + escape(duration, true) + ";"}">${each(range(3, 1), (i) => {
    return `<div class="${["dot svelte-kks203", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"--dotSize:" + escape(+size * 0.25, true) + escape(unit, true) + "; --color:" + escape(color, true) + "; animation-delay: " + escape(i * (+durationNum / 10), true) + escape(durationUnit, true) + ";"}"></div>`;
  })} </div>`;
});
const css = {
  code: ".loadingContainer.svelte-azjydz{height:100vh;display:flex;justify-content:center;align-items:center}",
  map: '{"version":3,"file":"loader.svelte","sources":["loader.svelte"],"sourcesContent":["<script>\\n    import { SyncLoader } from \\"svelte-loading-spinners\\";\\n<\/script>\\n\\n<div class=\\"loadingContainer\\">\\n    <SyncLoader size=\\"200\\" color=\\"#8c86aa\\" unit=\\"px\\" duration=\\"1s\\" />\\n</div>\\n\\n<style>\\n    .loadingContainer {\\n        height: 100vh;\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n    }\\n</style>"],"names":[],"mappings":"AASI,+BAAkB,CACd,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACjB"}'
};
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="loadingContainer svelte-azjydz">${validate_component(SyncLoader, "SyncLoader").$$render(
    $$result,
    {
      size: "200",
      color: "#8c86aa",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )} </div>`;
});
export {
  Loader as L
};
