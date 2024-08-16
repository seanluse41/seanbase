// src/routes/blog/+server.js

import { json } from '@sveltejs/kit';
import { getBlogPosts } from '../../requests/kintoneBlogRequests';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const projectFieldCode = url.searchParams.get('project') || '';
    const id = url.searchParams.get('id') || '';
    
    try {
        const records = await getBlogPosts({ projectFieldCode, id });
        return json(records);
    } catch (error) {
        console.error('Error in GET handler:', error);
        return json({ error: 'An error occurred while fetching blog posts' }, { status: 500 });
    }
}