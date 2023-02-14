import {Team, TeamOverview, UserData} from 'types';
import {BaseURL} from '../constants';

export const getData = async (path = '') => {
    const url = `${BaseURL}/${path}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
};

export const getTeams = (): Promise<Team[]> => {
    return getData('teams');
};

export const getTeamOverview = (teamId: string): Promise<TeamOverview> => {
    return getData(`teams/${teamId}`);
};

export const getUserData = (userId: string): Promise<UserData> => {
    return getData(`users/${userId}`);
};

export const getUsers = (userIds: string[]): Promise<UserData[]> => {
    return Promise.all(userIds.map(userId => getUserData(userId)));
};
