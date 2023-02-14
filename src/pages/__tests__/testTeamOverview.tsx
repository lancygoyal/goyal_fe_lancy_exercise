import * as React from 'react';
import {TeamOverview as TeamOverviewType, UserData} from 'types';
import {render, screen, waitFor} from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: 'ABC',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview = {
            id: '1',
            teamLeadId: '2',
            teamMemberIds: ['3', '4', '5'],
        };
        const userData = {
            id: '2',
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        };
        const users = [
            {...userData, id: '3'},
            {...userData, id: '4'},
            {...userData, id: '5'},
        ];
        jest.spyOn(API, 'getTeamOverview').mockImplementationOnce(() =>
            Promise.resolve(teamOverview as TeamOverviewType)
        );
        jest.spyOn(API, 'getUserData').mockImplementationOnce(() =>
            Promise.resolve(userData as UserData)
        );
        jest.spyOn(API, 'getUsers').mockImplementationOnce(() =>
            Promise.resolve(users as UserData[])
        );

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });
});
