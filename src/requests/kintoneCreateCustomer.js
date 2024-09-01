// /src/requests/kintoneCreateCustomer.js

const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

export async function addCustomerToKintone(customer = {}) {
    // Create a base record with default values
    const record = {
        companyName: { value: '' },
        email: { value: '' },
        current: { value: 'Yes' },
        contactName: { value: '' },
        stripeCustomerID: { value: '' },
        secretKey: { value: '' },
        domainName: { value: '' },
        stripeSubscriptionID: { value: '' },
        validToDate: { value: '' },
        cancellationDate: { value: '' },
        cancellationPageLink: { value: '' },
        companyContactNumber: { value: '' }
    };

    // If customer object is not empty, populate the record with customer data
    if (Object.keys(customer).length > 0) {
        record.companyName.value = customer.metadata?.company_name || '';
        record.email.value = customer.email || '';
        record.contactName.value = customer.name || '';
        record.stripeCustomerID.value = customer.id || '';
        record.secretKey.value = customer.metadata?.secretKey || '';
        record.domainName.value = customer.metadata?.kintone_domain || '';
        
        if (customer.phone) {
            record.companyContactNumber.value = customer.phone;
        } else if (customer.metadata?.customer_phone) {
            record.companyContactNumber.value = customer.metadata.customer_phone;
        }
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