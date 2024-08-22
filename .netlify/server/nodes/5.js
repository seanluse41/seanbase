import * as universal from '../entries/pages/blog/_slug_/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/[slug]/+page.js";
export const imports = ["_app/immutable/nodes/5.3GGG0moJ.js","_app/immutable/chunks/scheduler.BZd7pA5D.js","_app/immutable/chunks/badgePicker.CxeWvaDn.js","_app/immutable/chunks/index.C7torTeL.js","_app/immutable/chunks/index.guJCv2nW.js","_app/immutable/chunks/bundle-mjs.C1WdQso_.js","_app/immutable/chunks/index.BmQJSGr0.js","_app/immutable/chunks/CloseButton.BlTqOW3_.js","_app/immutable/chunks/ToolbarButton.BStrRmEa.js","_app/immutable/chunks/each.BqZeLSFP.js","_app/immutable/chunks/P.CTZ5ll7b.js","_app/immutable/chunks/Frame.yvaxdM5D.js","_app/immutable/chunks/loader.55N3Vttz.js"];
export const stylesheets = ["_app/immutable/assets/5.CZ0X2BcP.css","_app/immutable/assets/loader.CFR4gZyI.css"];
export const fonts = [];
