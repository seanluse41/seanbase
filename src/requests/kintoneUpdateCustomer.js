const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

export async function updateKintoneRecord(recordId, updatedFields) {
    const url = `https://${subdomain}.kintone.com/k/v1/record.json`;
    const headers = {
        'X-Cybozu-API-Token': customerAppToken,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                app: customerAppID,
                id: recordId,
                record: updatedFields
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Kintone record updated:', data);
        return data;
    } catch (error) {
        console.error('Error updating Kintone record:', error);
        throw error;
    }
}