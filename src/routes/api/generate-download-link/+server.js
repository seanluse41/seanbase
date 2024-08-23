// src/routes/api/generate-download-link/+server.js
import { json } from '@sveltejs/kit';
import crypto from 'crypto';

const SECRET_KEY = import.meta.env.VITE_JWT_SECRET

function generateToken(fileVersion) {
    const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
    const data = `${fileVersion}:${expirationTime}`;
    const hash = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
    return `${data}:${hash}`;
}

export async function GET({ url }) {
    const fileVersion = url.searchParams.get('version');
    if (!fileVersion) {
        return json({ error: 'Version parameter is required' }, { status: 400 });
    }

    const token = generateToken(fileVersion);
    const downloadLink = `${url.origin}/api/download-kguide?token=${encodeURIComponent(token)}`;

    return json({ downloadLink });
}