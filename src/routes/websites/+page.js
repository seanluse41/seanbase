import { getProjectsByType } from '../../requests/kintoneProjectRequests';

export async function load({ fetch }) {
    const websiteProjects = await getProjectsByType('web', fetch);
    return {
        projects: websiteProjects
    };
}