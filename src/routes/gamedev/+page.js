import { getProjectsByType } from '../../requests/kintoneProjectRequests';

export async function load({ fetch }) {
    const gamedevProjects = await getProjectsByType('game', fetch);
    return {
        projects: gamedevProjects
    };
}