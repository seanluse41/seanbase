// src/routes/getBlogPost/+server.js

import { json } from '@sveltejs/kit';
import { getBlogPosts } from '../../requests/kintoneBlogRequests';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, setHeaders }) {
    setHeaders({
        "cache-control": "max-age=60",
    });

    try {
        const body = await request.json();
        const recordID = body.id;

        const record = await getBlogPosts({ id: recordID });
        return json(record);
    } catch (error) {
        console.error('Error in POST handler:', error);
        return json({ error: 'An error occurred while fetching the blog post' }, { status: 500 });
    }
}