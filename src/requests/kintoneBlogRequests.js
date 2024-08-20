// src/requests/kintoneBlogRequests.js

const subdomain = import.meta.env.VITE_SUBDOMAIN;
const appId = import.meta.env.VITE_BLOG_APPID;
const apiToken = import.meta.env.VITE_BLOG_TOKEN;

async function fetchFromKintone(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': apiToken
        }
    });

    if (!response.ok) {
        const responseText = await response.text();
        console.error('Response body:', responseText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
    }

    return response.json();
}

export async function getBlogPosts(options = {}) {
    const { projectFieldCode, id } = options;

    if (id) {
        const url = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appId}&id=${id}`;
        const data = await fetchFromKintone(url);
        return data.record;
    } else {
        let query = 'order by Record_number desc';
        if (projectFieldCode) {
            query = `project="${encodeURIComponent(projectFieldCode)}" ${query}`;
        }

        const params = new URLSearchParams({
            app: appId,
            query: query
        });

        const url = `https://${subdomain}.kintone.com/k/v1/records.json?${params.toString()}`;
        const data = await fetchFromKintone(url);
        return data.records;
    }
}