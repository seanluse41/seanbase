const customerAppID = import.meta.env.VITE_CUSTOMER_INFO_APPID
const subdomain = import.meta.env.VITE_SUBDOMAIN
const customerAppToken = import.meta.env.VITE_CUSTOMER_INFO_TOKEN

export async function fetchCustomerFromKintone(stripeCustomerId) {
  const url = `https://${subdomain}.kintone.com/k/v1/records.json`;
  const headers = {
    'X-Cybozu-API-Token': customerAppToken,
    'Content-Type': 'application/json'
  };

  // Encode the query string without quotes
  const fieldCode = 'stripeCustomerID';
  const operator = '=';
  const value = stripeCustomerId;
  const query = `${fieldCode} ${operator} ${value}`;
  
  const params = new URLSearchParams({
    app: customerAppID,
    query: query
  });

  const fullUrl = `${url}?${params.toString()}`;
  console.log('Full URL:', fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
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