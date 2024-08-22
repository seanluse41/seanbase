const subdomain = "sean";
const appId = "149";
const apiToken = "sETjT8pmZzvBzUh5I3fmZRGTyTdSNxaanbo2nQ7i";
async function postToKintone(record) {
  const url = `https://${subdomain}.kintone.com/k/v1/record.json`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Cybozu-API-Token": apiToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      app: appId,
      record
    })
  });
  if (!response.ok) {
    const responseText = await response.text();
    console.error("Response body:", responseText);
    throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
  }
  return response.json();
}
async function submitInquiry(formData) {
  const record = {
    name: { value: formData.get("name") },
    companyName: { value: formData.get("company") },
    phoneNumber: { value: formData.get("phone") },
    email: { value: formData.get("email") }
  };
  return postToKintone(record);
}
async function POST({ request }) {
  try {
    const formData = await request.formData();
    if (formData.get("website")) {
      return new Response(JSON.stringify({ success: false, error: "Invalid submission" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await submitInquiry(formData);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error posting to Kintone:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
export {
  POST
};
