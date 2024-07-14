/** @type {import('./$types').RequestHandler} */
import { json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {

	setHeaders({
		"cache-control": "max-age=60",
	});
	let token = import.meta.env.VITE_PROJECT_TOKEN
	let appid = import.meta.env.VITE_PROJECT_APPID
	let subdomain = import.meta.env.VITE_SUBDOMAIN

	const parameters = 'query=order by Record_number asc';
	const getRecordsURL = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appid}&${parameters}`

	const fetchOptions = {
		method: 'GET',
		headers: {
			'X-Cybozu-API-Token': token,
		}
	}
	let response = await fetch(getRecordsURL, fetchOptions);
	const responseData = await response.json();
	return new json(responseData.records);
}