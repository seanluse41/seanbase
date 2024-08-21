// /src/routes/[slug]/+page.js
/** @type {import('./$types').PageLoad} */
import { get } from 'svelte/store';
import { projectsStore } from '../../stores/projects.js';
import { error } from '@sveltejs/kit';
import { getAllProjects, getProjectBySlug } from '../../requests/kintoneProjectRequests';

export async function load({ params, fetch }) {
    let projects = get(projectsStore);

    if (projects.length === 0) {
        projects = await getAllProjects(fetch);
    }

    try {
        let project = getProjectBySlug(params.slug, projects);
        
        // Keep the original logic for detail images
        if (project.detailImagesStore.length === 0 && project.detailImages.value.length > 0) {
            const files = await getFiles(project.Record_number.value, fetch);
            project.detailImagesStore = files;
            // Update the store with the new project data
            projectsStore.update(currentProjects => {
                let updatedProjects = [...currentProjects];
                let index = updatedProjects.findIndex(p => p.link.value === params.slug);
                if (index !== -1) {
                    updatedProjects[index] = project;
                }
                return updatedProjects;
            });
        }

        return { project };
    } catch (e) {
        throw error(404, 'Not found');
    }
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