// src/requests/kintoneInquiryRequests.js

const subdomain = import.meta.env.VITE_SUBDOMAIN;
const appId = import.meta.env.VITE_INQUIRY_APPID;
const apiToken = import.meta.env.VITE_INQUIRY_TOKEN;

async function postToKintone(record) {
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
        const responseText = await response.text();
        console.error('Response body:', responseText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
    }

    return response.json();
}

export async function submitInquiry(formData) {
    const record = {
        name: { value: formData.get('name') },
        companyName: { value: formData.get('company') },
        phoneNumber: { value: formData.get('phone') },
        email: { value: formData.get('email') },
        inquiry: { value: formData.get('inquiry')}
    };

    return postToKintone(record);
}