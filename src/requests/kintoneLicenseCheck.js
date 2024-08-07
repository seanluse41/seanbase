// src/requests/kintoneLicenseCheck.js

const subdomain = import.meta.env.VITE_SUBDOMAIN;
const appId = import.meta.env.VITE_CUSTOMER_INFO_APPID;
const apiToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN;

export async function checkLicense(secretKey) {
    const query = `secretKey = "${secretKey}"`;
    //const fields = ['secretKey', 'validToDate'];
    
    const url = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appId}&query=${query}}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Cybozu-API-Token': apiToken,
                'Content-Type': 'application/json'
            }
        });
        console.log(apiToken)

        // Log the x-cybozu-error header if present
        const cybozu_error = response.headers.get('x-cybozu-error');
        if (cybozu_error) {
            console.error('Cybozu Error:', cybozu_error);
        }

        // Log all headers for debugging
        console.log('All response headers:');
        for (let [key, value] of response.headers) {
            console.log(`${key}: ${value}`);
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, Cybozu Error: ${cybozu_error || 'None'}`);
        }

        const data = await response.json();
        console.log("data")
        console.log(data)
        if (data.records.length === 0) {
            return null; // No matching record found
        }

        // Assuming the first record is the one we want
        const record = data.records[0];
        console.log("record from licenseCheck")
        console.log(record)

        return {
            secretKey: record.secretKey.value,
            expirationDate: record.validToDate.value
        };

    } catch (error) {
        console.error('Error checking license in Kintone:', error);
        throw error;
    }
}