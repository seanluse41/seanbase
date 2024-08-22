

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gamedev/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.BPfaSb5b.js","_app/immutable/chunks/scheduler.BZd7pA5D.js","_app/immutable/chunks/index.guJCv2nW.js"];
export const stylesheets = [];
export const fonts = [];
