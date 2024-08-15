/** @type {import('./$types').RequestHandler} */
import { json } from '@sveltejs/kit';

export async function GET({ url, setHeaders }) {
    setHeaders({
        "cache-control": "max-age=60",
        "Access-Control-Allow-Origin": "*", // Allow requests from any origin
    });

    let token = import.meta.env.VITE_VERSION_TOKEN;
    let appid = import.meta.env.VITE_VERSION_APPID;
    let subdomain = import.meta.env.VITE_SUBDOMAIN;

    // Get the current version from the query parameter
    const currentVersion = url.searchParams.get('version');

    if (!currentVersion) {
        return json({ error: 'Version parameter is required' }, { status: 400 });
    }

    const getRecordURL = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appid}&query=order by $id desc limit 1`;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': token,
        }
    };

    try {
        let response = await fetch(getRecordURL, fetchOptions);
        const responseData = await response.json();
        console.log(responseData)

        if (responseData.records && responseData.records.length > 0) {
            const latestRecord = responseData.records[0];
            const latestVersion = latestRecord.version.value;
            const breakingChange = latestRecord.breakingChange.value;
            const isCurrent = currentVersion === latestVersion;

            return json({
                current: isCurrent,
                latestVersion: latestVersion,
                breakingChange: breakingChange
            });
        } else {
            return json({ error: 'No version data found' }, { status: 404 });
        }
    } catch (err) {
        console.error('Error fetching version data:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
}