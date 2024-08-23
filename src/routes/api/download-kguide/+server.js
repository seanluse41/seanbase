// src/routes/api/download-kguide/+server.js
import { error } from '@sveltejs/kit';
import crypto from 'crypto';

const SECRET_KEY = import.meta.env.VITE_JWT_SECRET

function verifyToken(token, fileVersion) {
    const [version, expirationTime, hash] = token.split(':');
    
    if (version !== fileVersion) return false;
    if (Date.now() > parseInt(expirationTime)) return false;

    const data = `${version}:${expirationTime}`;
    const expectedHash = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
    
    return hash === expectedHash;
}

export async function GET({ params, url, fetch }) {
    const { version } = params;
    const token = url.searchParams.get('token');

    if (!token || !verifyToken(token, version)) {
        throw error(403, 'Invalid or expired download link');
    }

    // Fetch the zip file from the kintone app
    const kintoneResponse = await fetch(`/api/getKguideUpdate?version=${version}`);
    const kintoneData = await kintoneResponse.json();

    if (!kintoneData.zipFile) {
        throw error(404, 'Zip file not found');
    }

    // Convert base64 to buffer
    const fileBuffer = Buffer.from(kintoneData.zipFile.data, 'base64');

    return new Response(fileBuffer, {
        headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="${kintoneData.zipFile.name}"`,
        },
    });
}