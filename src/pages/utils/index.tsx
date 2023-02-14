import * as React from 'react';
import {Team, ListItem, UserData} from 'types';

const getHighlightedText = (text, search) => {
    // Split text on search term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) => (
        <React.Fragment key={index}>
            {part.toLowerCase() === search ? (
                <b style={{backgroundColor: '#e8bb49'}}>{part}</b>
            ) : (
                part
            )}
        </React.Fragment>
    ));
};

export const mapTeams = (teams: Team[], search) => {
    return teams.map(team => {
        const columns = [
            {
                key: '💠',
                value: getHighlightedText(team?.name, search),
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

export const mapUser = (usr: UserData, isTL?: boolean, search?: string) => {
    const columns = [
        {
            key: isTL ? '🥷' : '🙂',
            value: getHighlightedText(`${usr.firstName} ${usr.lastName}`, search),
        },
        {
            key: '🔥',
            value: usr.displayName,
        },
        {
            key: '📍',
            value: usr.location,
        },
    ];

    return {
        id: usr.id,
        url: `/user/${usr.id}`,
        columns,
        navigationProps: {...usr, isTL},
    } as ListItem;
};

export const mapUsers = (users: UserData[], search) => {
    return users.map(usr => mapUser(usr, false, search)) as ListItem[];
};
