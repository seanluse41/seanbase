/** @type {import('./$types').PageLoad} */
import { get } from 'svelte/store';
import { projectsStore } from '../../stores/projects.js';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    let projects = get(projectsStore);

    if (projects.length === 0) {
        projects = await getAllProjects(fetch);
    }
    let project = await getProjectBySlug(params.slug, projects, fetch);
    if (project) {
        return { project };
    }
    throw error(404, 'Not found');
}

const getAllProjects = async (fetch) => {
    const projectRequest = await fetch("/", {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
    });
    let projects = await projectRequest.json();
    for (const project of projects) {
        if (!project.imageURL) {
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
};

const getProjectBySlug = async (slug, projects, fetch) => {
    let projectIndex = projects.findIndex(project => project.link.value === slug);
    if (projectIndex === -1) {
        throw error(404, 'Project not found');
    }
    let projectObject = { ...projects[projectIndex] };

    // Check if we already loaded project's detail images
    if (projectObject.detailImagesStore.length === 0) {
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

const getFiles = async (recordID, fetch) => {
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
};