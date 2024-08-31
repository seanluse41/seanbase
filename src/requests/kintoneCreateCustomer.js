const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

export async function addCustomerToKintone(customer) {

    const record = {
        companyName: { value: customer.metadata.company_name || '' },
        email: { value: customer.email || '' },
        current: { value: 'Yes' },
        contactName: { value: customer.name || '' },
        stripeCustomerID: { value: customer.id },
        secretKey: { value: customer.metadata.secretKey },
        domainName: { value: customer.metadata.kintone_domain || '' },
        stripeSubscriptionID: { value: '' },
        validToDate: { value: '' },
        cancellationDate: { value: '' },
        cancellationPageLink: { value: '' }
    };

    if (customer.phone) {
        record.companyContactNumber = { value: customer.phone };
    } else if (customer.metadata && customer.metadata.customer_phone) {
        record.companyContactNumber = { value: customer.metadata.customer_phone };
    }

    const url = `https://${subdomain}.kintone.com/k/v1/record.json`;
    const headers = {
        'X-Cybozu-API-Token': customerAppToken,
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ app: customerAppID, record: record })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Customer added to Kintone:', data);
        return data;
    } catch (error) {
        console.error('Error adding customer to Kintone:', error);
        throw error;
    }
}