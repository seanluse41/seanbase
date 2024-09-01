// src/requests/kintoneGetCustomer.js

const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

export async function fetchCustomerFromKintone(recordId) {
  const url = `https://${subdomain}.kintone.com/k/v1/record.json?app=${customerAppID}&id=${recordId}`;
  const headers = {
    'X-Cybozu-API-Token': customerAppToken
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.record;
  } catch (error) {
    console.error('Error fetching customer from Kintone:', error);
    throw error;
  }
}