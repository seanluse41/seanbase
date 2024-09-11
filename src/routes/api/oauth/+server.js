import { error, json } from '@sveltejs/kit';
const SECRET = import.meta.env.VITE_KINTONE_OAUTH_SECRET

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, fetch }) {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
        throw error(400, 'Authorization code is missing');
    }

    // TODO: Implement state verification for CSRF protection
    // if (!state || state !== expectedState) {
    //     throw error(400, 'Invalid state parameter');
    // }

    const tokenEndpoint = 'https://sean.kintone.com/oauth2/token';
    const clientId = 'l.1.46qxu8oo3h3gvfi0vlvon9lw81b0xux5';
    const redirectUri = 'https://seanbase.com/api/oauth';

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientId}:${SECRET}`)
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Token exchange error:', errorData);
            throw error(response.status, 'Failed to exchange code for token');
        }

        const tokenData = await response.json();

        // TODO: Implement secure server-side token storage
        // For now, we're returning a success message to the client
        return json({
            message: 'Authorization successful',
            tokenType: tokenData.token_type,
            expiresIn: tokenData.expires_in
        });

    } catch (err) {
        console.error('Error in OAuth flow:', err);
        throw error(500, 'Internal server error during OAuth process');
    }
}