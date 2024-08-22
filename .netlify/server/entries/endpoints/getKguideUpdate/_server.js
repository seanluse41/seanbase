import { j as json } from "../../../chunks/index.js";
async function GET({ url, setHeaders }) {
  setHeaders({
    "cache-control": "max-age=60",
    "Access-Control-Allow-Origin": "*"
    // Allow requests from any origin
  });
  let token = "UYg2RvOHB5pCPpbEkSRp1XCGNTWb5P2h4TxsigUe";
  let appid = "147";
  let subdomain = "sean";
  console.log("checking version...");
  const currentVersion = url.searchParams.get("version");
  console.log(currentVersion);
  if (!currentVersion) {
    return json({ error: "Version parameter is required" }, { status: 400 });
  }
  const getRecordURL = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appid}&query=order by $id desc limit 1`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "X-Cybozu-API-Token": token
    }
  };
  try {
    let response = await fetch(getRecordURL, fetchOptions);
    const responseData = await response.json();
    if (responseData.records && responseData.records.length > 0) {
      const latestRecord = responseData.records[0];
      const latestVersion = latestRecord.versionNumber.value;
      const breakingChange = latestRecord.breakingChange.value;
      const isCurrent = currentVersion === latestVersion;
      return json({
        current: isCurrent,
        latestVersion,
        breakingChange
      });
    } else {
      return json({ error: "No version data found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error fetching version data:", err);
    return json({ error: "Internal server error" }, { status: 500 });
  }
}
export {
  GET
};
