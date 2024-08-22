import { e as error } from "../../../chunks/index.js";
async function POST({ request, setHeaders }) {
  setHeaders({
    "cache-control": "max-age=60"
  });
  let blogToken = "JJt7gv1CG1Sn2l5y4M2Hkm7moVe0BeQYjRKdn3Eu";
  let blogAppid = "122";
  let projectToken = "t3nXoHRO46FhZKGjxWHTlUVRoFYvENIZ9pSRz62X";
  let projectAppid = "120";
  let subdomain = "sean";
  const body = await request.json();
  const recordID = body.recordID;
  const path = body.path;
  const getProjectRecordURL = `https://${subdomain}.kintone.com/k/v1/record.json?app=${projectAppid}&id=${recordID}`;
  const getBlogRecordURL = `https://${subdomain}.kintone.com/k/v1/record.json?app=${blogAppid}&id=${recordID}`;
  const fetchOptions = {
    method: "GET",
    headers: {
      "X-Cybozu-API-Token": path == "blog" ? blogToken : projectToken
    }
  };
  let response;
  if (path == "blog") {
    response = await fetch(getBlogRecordURL, fetchOptions);
  } else {
    response = await fetch(getProjectRecordURL, fetchOptions);
  }
  const responseData = await response.json();
  if (responseData.record.detailImages.value.length >= 1) {
    const filePromises = responseData.record.detailImages.value.map(async (file) => {
      const fileKey = file.fileKey;
      const getFileURL = `https://${subdomain}.kintone.com/k/v1/file.json?fileKey=${fileKey}`;
      const fileData = await fetch(getFileURL, fetchOptions);
      const blob = await fileData.blob();
      return {
        blob,
        contentType: blob.type,
        name: file.name
      };
    });
    const files = await Promise.all(filePromises);
    const responseBody = await Promise.all(files.map(async (file) => ({
      contentType: file.contentType,
      name: file.name,
      data: Array.from(new Uint8Array(await file.blob.arrayBuffer()))
    })));
    return new Response(JSON.stringify(responseBody), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } else {
    error(404, {
      message: "Not found"
    });
  }
}
export {
  POST
};
