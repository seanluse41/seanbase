

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/hire/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.D3T9ap-e.js","_app/immutable/chunks/scheduler.BZd7pA5D.js","_app/immutable/chunks/index.guJCv2nW.js"];
export const stylesheets = [];
export const fonts = [];
