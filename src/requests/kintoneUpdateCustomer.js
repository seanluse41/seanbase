// /src/requests/kintoneUpdateCustomer.js

const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

export async function updateKintoneRecord(recordId, updatedFields) {
    if (!recordId) {
        throw new Error('Record ID is required');
    }
    if (!updatedFields || typeof updatedFields !== 'object' || Object.keys(updatedFields).length === 0) {
        throw new Error('Updated fields must be a non-empty object');
    }

    for (const [key, value] of Object.entries(updatedFields)) {
        if (typeof value !== 'object' || !('value' in value)) {
            throw new Error(`Invalid format for field '${key}'. Expected an object with a 'value' property.`);
        }
    }

    const url = `https://${subdomain}.kintone.com/k/v1/record.json`;
    const headers = {
        'X-Cybozu-API-Token': customerAppToken,
        'Content-Type': 'application/json'
    };

    const requestBody = {
        app: customerAppID,
        id: recordId,
        record: updatedFields
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Kintone API error response:', errorBody);
            console.error('Request body:', JSON.stringify(requestBody, null, 2));
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        }

        const data = await response.json();
        console.log('Kintone record updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating Kintone record:', error);
        throw error;
    }
}