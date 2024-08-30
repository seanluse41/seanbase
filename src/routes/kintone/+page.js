import { getProjectsByType } from '../../requests/kintoneProjectRequests';

export async function load({ fetch }) {
    const kintoneProjects = await getProjectsByType('kintone', fetch);
    return {
        projects: kintoneProjects
    };
}