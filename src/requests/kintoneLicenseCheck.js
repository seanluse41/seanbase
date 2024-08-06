// src/requests/kintoneLicenseCheck.js

const subdomain = import.meta.env.VITE_SUBDOMAIN;
const appId = import.meta.env.VITE_CUSTOMER_INFO_APPID;
const apiToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN;

export async function checkLicense(secretKey) {
    const query = `secretKey="${secretKey}"`;
    const fields = ['secretKey', 'validToDate'];
    
    const url = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appId}&query=${encodeURIComponent(query)}&fields=${fields.join(',')}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Cybozu-API-Token': apiToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
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