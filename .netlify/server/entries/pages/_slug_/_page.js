import { g as get_store_value } from "../../../chunks/utils.js";
import { p as projectsStore } from "../../../chunks/projects.js";
import { e as error } from "../../../chunks/index.js";
async function load({ params, fetch }) {
  let projects = get_store_value(projectsStore);
  if (projects.length === 0) {
    projects = await getAllProjects(fetch);
  }
  let project = await getProject(params.slug, projects, fetch);
  if (project) {
    return { project };
  }
  throw error(404, "Not found");
}
const getAllProjects = async (fetch) => {
  const projectRequest = await fetch("/", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    }
  });
  let projects = await projectRequest.json();
  for (const project of projects) {
    if (!project.imageURL && project.image.value.length > 0) {
      let imageURL = await getImage(project.Record_number.value, fetch);
      project.imageURL = imageURL;
    }
    if (!project.detailImagesStore) {
      project.detailImagesStore = [];
    }
  }
  projectsStore.set(projects);
  return projects;
};
const getImage = async (recordID, fetch) => {
  let imageURL;
  const imageRequest = await fetch("/getImage", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ recordID })
  });
  if (imageRequest.status == 200) {
    let imageBlob = await imageRequest.blob();
    imageURL = URL.createObjectURL(imageBlob);
  } else {
    imageURL = null;
  }
  return imageURL;
};
const getProject = async (slug, projects, fetch) => {
  let projectIndex = projects.findIndex((project) => project.link.value === slug);
  if (projectIndex === -1) {
    throw error(404, "Project not found");
  }
  let projectObject = { ...projects[projectIndex] };
  if (projectObject.detailImagesStore) {
    if (projectObject.detailImagesStore.length === 0 && projectObject.detailImages.value.length > 0) {
      const files = await getFiles(projectObject.Record_number.value, fetch);
      projectObject.detailImagesStore = files;
      projectsStore.update((currentProjects) => {
        let updatedProjects = [...currentProjects];
        updatedProjects[projectIndex] = projectObject;
        return updatedProjects;
      });
    }
  } else {
    const files = await getFiles(projectObject.Record_number.value, fetch);
    projectObject.detailImagesStore = files;
    projectsStore.update((currentProjects) => {
      let updatedProjects = [...currentProjects];
      updatedProjects[projectIndex] = projectObject;
      return updatedProjects;
    });
  }
  return projectObject;
};
const getFiles = async (recordID, fetch) => {
  let files = [];
  const fileRequest = await fetch("/getImages", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ recordID, path: "projects" })
  });
  if (fileRequest.status === 200) {
    files = await fileRequest.json();
  }
  return files;
};
export {
  load
};
