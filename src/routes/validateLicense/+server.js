// src/routes/validatelicense/+server.js

import jwt from 'jsonwebtoken';
import { error, json } from '@sveltejs/kit';
import { checkLicense } from '../../requests/kintoneLicenseCheck';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;
const ALLOWED_ORIGINS = import.meta.env.VITE_ALLOWED_ORIGINS.split(',');

// Create a rate limiter instance for non-Kintone requests
const nonKintoneLimiter = new RateLimiter({
  IP: [10, 'h'], // 10 requests per hour per IP for non-Kintone requests
});

export async function GET({ url, request, getClientAddress }) {
    const origin = request.headers.get('origin');

    // Check if the request is coming from a valid Kintone domain
    const isValidKintoneOrigin = ALLOWED_ORIGINS.some(domain => origin?.endsWith(domain.trim()));

    if (!isValidKintoneOrigin) {
        // Apply strict rate limiting to non-Kintone requests
        try {
            await nonKintoneLimiter.check(request, getClientAddress());
        } catch (rateLimitError) {
            throw error(429, 'Too Many Requests');
        }
        // Even if they pass rate limiting, we still block non-Kintone requests
        throw error(403, 'Forbidden');
    }

    // Get secret key from query parameter
    const secretKey = url.searchParams.get('secretKey');

    if (!secretKey) {
        throw error(400, 'Missing secret key');
    }

    try {
        // Check license in Kintone
        const record = await checkLicense(secretKey);

        if (!record) {
            throw error(404, 'Invalid secret key');
        }
        // Check expiration date
        const expirationDate = new Date(record.expirationDate);
        const today = new Date();

        if (expirationDate < today) {
            return json({ status: 'expired' });
        }

        // Generate JWT token
        const token = jwt.sign({ secretKey }, JWT_SECRET, { expiresIn: '7d' });
        const response = json({ status: 'active', token: token });
        return response;
    } catch (err) {
        console.error(err);
        throw error(500, 'Internal Server Error');
    }
}