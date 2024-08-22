import { j as json } from "../../../chunks/index.js";
const subdomain = "sean";
const appId = "122";
const apiToken = "JJt7gv1CG1Sn2l5y4M2Hkm7moVe0BeQYjRKdn3Eu";
async function fetchFromKintone(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Cybozu-API-Token": apiToken
    }
  });
  if (!response.ok) {
    const responseText = await response.text();
    console.error("Response body:", responseText);
    throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
  }
  return response.json();
}
async function getBlogPosts(options = {}) {
  const { projectFieldCode, id } = options;
  if (id) {
    const url = `https://${subdomain}.kintone.com/k/v1/record.json?app=${appId}&id=${id}`;
    const data = await fetchFromKintone(url);
    return data.record;
  } else {
    let query = "order by Record_number desc";
    if (projectFieldCode) {
      query = `project="${encodeURIComponent(projectFieldCode)}" ${query}`;
    }
    const params = new URLSearchParams({
      app: appId,
      query
    });
    const url = `https://${subdomain}.kintone.com/k/v1/records.json?${params.toString()}`;
    const data = await fetchFromKintone(url);
    return data.records;
  }
}
async function GET({ url }) {
  const projectFieldCode = url.searchParams.get("project") || "";
  const id = url.searchParams.get("id") || "";
  try {
    const records = await getBlogPosts({ projectFieldCode, id });
    return json(records);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return json({ error: "An error occurred while fetching blog posts" }, { status: 500 });
  }
}
export {
  GET
};
