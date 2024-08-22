export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.B4iYdIDD.js","app":"_app/immutable/entry/app.CbmeRPtZ.js","imports":["_app/immutable/entry/start.B4iYdIDD.js","_app/immutable/chunks/entry.D9r9bvhq.js","_app/immutable/chunks/scheduler.BZd7pA5D.js","_app/immutable/chunks/index.C7torTeL.js","_app/immutable/entry/app.CbmeRPtZ.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.BZd7pA5D.js","_app/immutable/chunks/index.guJCv2nW.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: __memo(() => import('./entries/endpoints/_server.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: __memo(() => import('./entries/endpoints/blog/_server.js'))
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/commerce-disclosure",
				pattern: /^\/commerce-disclosure\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/contact/_server.js'))
			},
			{
				id: "/gamedev",
				pattern: /^\/gamedev\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/generate-receipt",
				pattern: /^\/generate-receipt\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/generate-receipt/_server.js'))
			},
			{
				id: "/getImages",
				pattern: /^\/getImages\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/getImages/_server.js'))
			},
			{
				id: "/getImage",
				pattern: /^\/getImage\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/getImage/_server.js'))
			},
			{
				id: "/getKguideUpdate",
				pattern: /^\/getKguideUpdate\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/getKguideUpdate/_server.js'))
			},
			{
				id: "/handleSubscription",
				pattern: /^\/handleSubscription\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/handleSubscription/_server.js'))
			},
			{
				id: "/hire",
				pattern: /^\/hire\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/kintone",
				pattern: /^\/kintone\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/subscriptionSuccess",
				pattern: /^\/subscriptionSuccess\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/validateLicense",
				pattern: /^\/validateLicense\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/validateLicense/_server.js'))
			},
			{
				id: "/[slug]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
