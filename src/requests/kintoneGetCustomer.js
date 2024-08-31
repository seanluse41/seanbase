const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

export async function fetchCustomerFromKintone(stripeCustomerId) {
    const url = `https://${subdomain}.kintone.com/k/v1/records.json`;
    const headers = {
      'X-Cybozu-API-Token': customerAppToken,
      'Content-Type': 'application/json'
    };
  
    const query = `stripeCustomerID = "${stripeCustomerId}"`;
  
    try {
      const response = await fetch(`${url}?app=${customerAppID}&query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: headers
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.records.length === 0) {
        throw new Error('Customer not found in Kintone');
      }
  
      return data.records[0];
    } catch (error) {
      console.error('Error fetching customer from Kintone:', error);
      throw error;
    }
  }