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

	if (responseData.record.detailImages.value.length >= 1) {
		const filePromises = responseData.record.detailImages.value.map(async (file) => {
			const fileKey = file.fileKey;
			const getFileURL = `https://${subdomain}.kintone.com/k/v1/file.json?fileKey=${fileKey}`;
			const fileData = await fetch(getFileURL, fetchOptions);
			const blob = await fileData.blob();
			return {
				blob: blob,
				contentType: blob.type,
				name: file.name
			};
		});

		const files = await Promise.all(filePromises);

		// Prepare the response data
		const responseBody = await Promise.all(files.map(async file => ({
			contentType: file.contentType,
			name: file.name,
			data: Array.from(new Uint8Array(await file.blob.arrayBuffer()))
		})));

		return new Response(JSON.stringify(responseBody), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} else {
		error(404, {
			message: 'Not found'
		});
	}
}