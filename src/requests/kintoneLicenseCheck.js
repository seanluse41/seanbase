// src/requests/kintoneLicenseCheck.js

const subdomain = import.meta.env.VITE_SUBDOMAIN;
const appId = import.meta.env.VITE_CUSTOMER_INFO_APPID;
const apiToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN;

export async function checkLicense(secretKey) {
    const query = `secretKey="${encodeURIComponent(secretKey)}"`;
    const fields = ['secretKey', 'validToDate'];
    
    const params = new URLSearchParams({
        app: appId,
        query: query,
        fields: fields.join(',')
    });
    
    const url = `https://${subdomain}.kintone.com/k/v1/records.json?${params.toString()}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Cybozu-API-Token': apiToken
            }
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error('Response body:', responseText);
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        const data = await response.json();
        if (data.records.length === 0) {
            return null; // No matching record found
        }

        // Assuming the first record is the one we want
        const record = data.records[0];

        return {
            secretKey: record.secretKey.value,
            expirationDate: record.validToDate.value
        };

    } catch (error) {
        console.error('Error checking license in Kintone:', error);
        throw error;
    }
}