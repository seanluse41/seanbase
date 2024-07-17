/** @type {import('./$types').PageLoad} */
import { projectsStore } from '../../stores/projects.js';
let projects = [];

projectsStore.subscribe(value => {
    projects = value;
});

export async function load({ params }) {
    let project = getProjectBySlug(params.slug, projects)
    if (project) {
        return {...project}
    }

    error(404, 'Not found');
}

const getProjectBySlug = (slug, projects) => {
    return projects.find(project => project.link.value === slug);
}