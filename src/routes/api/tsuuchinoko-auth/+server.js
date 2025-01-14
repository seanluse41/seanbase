// src/routes/api/tsuuchinoko-auth/+server.ts
import { error, redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
    // Extract OAuth parameters from URL
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error_param = url.searchParams.get('error');

    // Handle OAuth errors
    if (error_param) {
        throw error(400, {
            message: `OAuth error: ${error_param}`
        });
    }

    // Validate required parameters
    if (!code) {
        throw error(400, {
            message: 'Missing required OAuth code parameter'
        });
    }

    // Optional: Validate state parameter if you're using it for CSRF protection
    // if (!state || state !== expectedState) {
    //     throw error(400, {
    //         message: 'Invalid state parameter'
    //     });
    // }

    // Construct deep link URL with parameters
    const deepLinkUrl = new URL('tsuuchinoko://oauth/callback');
    deepLinkUrl.searchParams.set('code', code);
    if (state) {
        deepLinkUrl.searchParams.set('state', state);
    }

    // Redirect to the deep link URL
    // Note: You might want to add a fallback page for browsers that don't support the protocol
    throw redirect(302, deepLinkUrl.toString());
};