// src/routes/api/contact/+server.js
import { submitInquiry } from '../../../requests/kintoneInquiryRequests';

export async function POST({ request }) {
    try {
        const formData = await request.formData();

        // Check honeypot field
        if (formData.get('website')) {
            return new Response(JSON.stringify({ success: false, error: 'Invalid submission' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        await submitInquiry(formData);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error posting to Kintone:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}