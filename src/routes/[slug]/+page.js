import { getProject } from '../../requests/kintoneProjectRequests.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    try {
        const project = await getProject(params.slug, fetch);
        return { project };
    } catch (e) {
        if (e.status === 404) {
            throw error(404, 'Project not found');
        }
        throw error(500, 'An error occurred while fetching the project');
    }
}