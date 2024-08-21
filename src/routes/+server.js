// /src/routes/+server.js

import { json } from '@sveltejs/kit';
import { getAllProjects } from '../requests/kintoneProjectRequests';

export async function GET({ fetch, setHeaders }) {
    setHeaders({
        "cache-control": "max-age=60",
    });
    
    const projects = await getAllProjects(fetch);
    return json(projects);
}