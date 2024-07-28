/** @type {import('./$types').PageLoad} */
import { projectsStore } from '../../stores/projects.js';
let projects = [];

projectsStore.subscribe(value => {
    projects = value;
});

export async function load({ params }) {
    let project = await getProjectBySlug(params.slug, projects)
    if (project) {
        return {...project}
    }

    error(404, 'Not found');
}

const getProjectBySlug = async (slug, projects) => {
    let projectObject = projects.find(project => project.link.value === slug);
    const files = await getFiles(projectObject.Record_number.value);
    files.forEach(file => {
        if (file.contentType.startsWith('image/')) {
            projectObject.detailImages.push(file)
        } else if (file.contentType.startsWith('video/')) {
            projectObject.videos.push(file)
        }
    });
    return projectObject
}

const getFiles = async (recordID) => {
    let fileURLs = [];
    const fileRequest = await fetch("/getImages", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ recordID }),
    });
    if (fileRequest.status == 200) {
        const files = await fileRequest.json();
        
        for (let file of files) {
            const blob = new Blob([new Uint8Array(file.data)], { type: file.contentType });
            const fileURL = URL.createObjectURL(blob);
            fileURLs.push({
                url: fileURL,
                contentType: file.contentType,
                name: file.name
            });
        }
    }
    return fileURLs;
};