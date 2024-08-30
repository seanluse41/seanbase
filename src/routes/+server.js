// /src/routes/+server.js

import { json } from '@sveltejs/kit';
import { projectsStore } from '../stores/projects.js';

const token = import.meta.env.VITE_PROJECT_TOKEN;
const appid = import.meta.env.VITE_PROJECT_APPID;
const subdomain = import.meta.env.VITE_SUBDOMAIN;

export async function GET({ fetch, setHeaders }) {
    setHeaders({
        "cache-control": "max-age=60",
    });
    const parameters = 'query=order by Record_number asc';
    const getRecordsURL = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appid}&${parameters}`;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'X-Cybozu-API-Token': token,
        }
    };

    try {
        const response = await fetch(getRecordsURL, fetchOptions);
        const responseData = await response.json();
        const projects = responseData.records;

        projectsStore.set(projects);
        return json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}