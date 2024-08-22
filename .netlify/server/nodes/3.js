import * as universal from '../entries/pages/_slug_/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/3.DYY7A6cl.js","_app/immutable/chunks/scheduler.BZd7pA5D.js","_app/immutable/chunks/projects.CSdbtFYS.js","_app/immutable/chunks/index.C7torTeL.js","_app/immutable/chunks/entry.D9r9bvhq.js","_app/immutable/chunks/index.guJCv2nW.js","_app/immutable/chunks/P.CTZ5ll7b.js","_app/immutable/chunks/bundle-mjs.C1WdQso_.js","_app/immutable/chunks/Frame.yvaxdM5D.js","_app/immutable/chunks/Button.CFIJJyZC.js","_app/immutable/chunks/runtime.DiTEHseV.js","_app/immutable/chunks/loader.55N3Vttz.js","_app/immutable/chunks/each.BqZeLSFP.js","_app/immutable/chunks/index.BmQJSGr0.js","_app/immutable/chunks/Label.BXzxq5lG.js","_app/immutable/chunks/CloseButton.BlTqOW3_.js","_app/immutable/chunks/ToolbarButton.BStrRmEa.js","_app/immutable/chunks/await_block.Cis26Lyl.js"];
export const stylesheets = ["_app/immutable/assets/loader.CFR4gZyI.css"];
export const fonts = [];
