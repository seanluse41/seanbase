// /src/requests/kintoneProjectRequests.js

import { projectsStore } from '../stores/projects.js';
import { get } from "svelte/store";
import { error } from '@sveltejs/kit';

let projectsFetched = false;

export async function getAllProjects(fetch) {
    let projects = get(projectsStore);
    if (projects.length === 0 || !projectsFetched) {
        const projectRequest = await fetch("/", {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "content-type": "application/json",
            },
        });
        projects = await projectRequest.json();
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
        projectsFetched = true;
    }
    return projects;
}

export async function getProject(slug, fetch) {
    let projects = await getAllProjects(fetch);
    let projectIndex = projects.findIndex(project => project.link.value === slug);
    if (projectIndex === -1) {
        throw error(404, 'Project not found');
    }
    let projectObject = { ...projects[projectIndex] };
    
    // Check if we need to load project's detail images
    if (projectObject.detailImagesStore.length === 0 && projectObject.detailImages.value.length > 0) {
        const files = await getFiles(projectObject.Record_number.value, fetch);
        projectObject.detailImagesStore = files;
        // Update the store with the new project data
        projectsStore.update(currentProjects => {
            let updatedProjects = [...currentProjects];
            updatedProjects[projectIndex] = projectObject;
            return updatedProjects;
        });
    }
    
    return projectObject;
}

async function getImage(recordID, fetch) {
    let imageURL;
    const imageRequest = await fetch("/getImage", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ recordID }),
    });
    if (imageRequest.status == 200) {
        let imageBlob = await imageRequest.blob();
        imageURL = URL.createObjectURL(imageBlob);
    } else {
        imageURL = null;
    }
    return imageURL;
}

async function getFiles(recordID, fetch) {
    let files = [];
    const fileRequest = await fetch("/getImages", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ recordID: recordID, path: "projects" }),
    });

    if (fileRequest.status === 200) {
        files = await fileRequest.json();
    }
    return files;
}

export async function getProjectsByType(type, fetch) {
    let projects = get(projectsStore);
    if (projects.length === 0 || !projectsFetched) {
        projects = await getAllProjects(fetch);
    }
    return projects.filter(project => project.type.value === type);
}