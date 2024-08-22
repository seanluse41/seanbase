import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.HIGSBh1V.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/runtime.DiTEHseV.js","_app/immutable/chunks/index.C7torTeL.js","_app/immutable/chunks/scheduler.BZd7pA5D.js","_app/immutable/chunks/index.guJCv2nW.js","_app/immutable/chunks/Button.CFIJJyZC.js","_app/immutable/chunks/bundle-mjs.C1WdQso_.js","_app/immutable/chunks/Frame.yvaxdM5D.js","_app/immutable/chunks/ToolbarButton.BStrRmEa.js","_app/immutable/chunks/index.BmQJSGr0.js","_app/immutable/chunks/stores.BWBXEo09.js","_app/immutable/chunks/entry.D9r9bvhq.js"];
export const stylesheets = ["_app/immutable/assets/0.BF6t8pSW.css"];
export const fonts = [];
