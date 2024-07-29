/** @type {import('./$types').RequestHandler} */
import { json } from '@sveltejs/kit';

export async function POST({ request, setHeaders }) {

	setHeaders({
		"cache-control": "max-age=60",
	});
	let token = import.meta.env.VITE_BLOG_TOKEN
	let appid = import.meta.env.VITE_BLOG_APPID
	let subdomain = import.meta.env.VITE_SUBDOMAIN

	const body = await request.json();
	const recordID = body.id;

	const getRecordURL = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appid}&id=${recordID}`
	const fetchOptions = {
		method: 'GET',
		headers: {
			'X-Cybozu-API-Token': token,
		}
	}
	let response = await fetch(getRecordURL, fetchOptions);
	const responseData = await response.json();
	return json(responseData.record);
}