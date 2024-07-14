/** @type {import('./$types').RequestHandler} */
import { error } from '@sveltejs/kit';

export async function POST({ request, setHeaders }) {

	setHeaders({
		"cache-control": "max-age=60",
	});

	let token = import.meta.env.VITE_PROJECT_TOKEN
	let appid = import.meta.env.VITE_PROJECT_APPID
	let subdomain = import.meta.env.VITE_SUBDOMAIN

	const body = await request.json();
	const recordID = body.recordID;

	const getRecordURL = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appid}&id=${recordID}`

	const fetchOptions = {
		method: 'GET',
		headers: {
			'X-Cybozu-API-Token': token,
		}
	}
	let response = await fetch(getRecordURL, fetchOptions);
	const responseData = await response.json();
	if (responseData.record.image.value.length >= 1) {
		const fileKey = responseData.record.image?.value[0].fileKey;
		const getFileURL = `https://${subdomain}.kintone.com/k/v1/file.json?fileKey=${fileKey}`;
		const imageData = await fetch(getFileURL, fetchOptions);
		const imageDataBlob = await imageData.blob();
		return new Response(imageDataBlob, {
			headers: {
				'Content-Type': 'image/webp', // Set the content type for WebP images
			},
		});
	} else {
		error(404, {
			message: 'Not found'
		});
	}
}