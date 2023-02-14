import {mapTeams, mapUsers} from '../utils';

describe('Utils', () => {
    it('should return mapped teams', async () => {
        const teams = [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ];

        const mappedTeams = mapTeams(teams, '');

        expect(mappedTeams).toHaveLength(2);

        expect(mappedTeams[0].columns).toHaveLength(1);

        expect(mappedTeams[0].url).toContain('team');
    });

    it('should return mapped users', async () => {
        const user = id => ({
            id,
            firstName: `User ${id}`,
            lastName: 'Data',
            displayName: 'userData',
            location: '',
            avatar: '',
        });

        const users = [user(2), user(3), user(4), user(5)];

        const mappedUsers = mapUsers(users, '');

        expect(mappedUsers).toHaveLength(4);

        expect(mappedUsers[0].columns).toHaveLength(3);

        expect(mappedUsers[0].url).toContain('user');
    });
});
