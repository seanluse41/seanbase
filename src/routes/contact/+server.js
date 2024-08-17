const subdomain = import.meta.env.VITE_SUBDOMAIN;
const appId = import.meta.env.VITE_INQUIRY_APPID;
const apiToken = import.meta.env.VITE_INQUIRY_TOKEN;

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

        const record = {
            name: { value: formData.get('name') },
            companyName: { value: formData.get('company') },
            phoneNumber: { value: formData.get('phone') },
            email: { value: formData.get('email') }
        };
        const url = `https://${subdomain}.kintone.com/k/v1/record.json`;


        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-Cybozu-API-Token': apiToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                app: appId,
                record: record
            })
        });

        if (!response.ok) {
            throw new Error('Failed to post to Kintone');
        }

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