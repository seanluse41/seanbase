import { j as json } from "../../chunks/index.js";
import { p as projectsStore } from "../../chunks/projects.js";
const token = "t3nXoHRO46FhZKGjxWHTlUVRoFYvENIZ9pSRz62X";
const appid = "120";
const subdomain = "sean";
async function getAllProjects(fetch) {
  const parameters = "query=order by Record_number asc";
  const getRecordsURL = `https://${subdomain}.kintone.com/k/v1/records.json?app=${appid}&${parameters}`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "X-Cybozu-API-Token": token
    }
  };
  try {
    const response = await fetch(getRecordsURL, fetchOptions);
    const responseData = await response.json();
    const projects = responseData.records;
    projectsStore.set(projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
async function GET({ fetch, setHeaders }) {
  setHeaders({
    "cache-control": "max-age=60"
  });
  const projects = await getAllProjects(fetch);
  return json(projects);
}
export {
  GET
};
