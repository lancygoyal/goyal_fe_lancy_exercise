/* eslint-disable testing-library/no-unnecessary-act */
import * as React from 'react';
import {TeamOverview as TeamOverviewType, UserData} from 'types';
import {render, screen, waitFor, act, fireEvent} from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: '11',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '11',
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

    const team = {
        id: '11',
        teamLeadId: '1',
        teamMemberIds: ['2', '3', '4', '5'],
    };

    const user = id => ({
        id,
        firstName: `User ${id}`,
        lastName: 'Data',
        displayName: 'userData',
        location: '',
        avatar: '',
    });

    const lead = user(1);

    const users = [user(2), user(3), user(4), user(5)];

    it('should render team overview users', async () => {
        jest.spyOn(API, 'getTeamOverview').mockImplementationOnce(() =>
            Promise.resolve(team as TeamOverviewType)
        );
        jest.spyOn(API, 'getUserData').mockImplementationOnce(() =>
            Promise.resolve(lead as UserData)
        );
        jest.spyOn(API, 'getUsers').mockImplementationOnce(() =>
            Promise.resolve(users as UserData[])
        );

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(5);
        });
    });

    it('should render search textbox', async () => {
        jest.spyOn(API, 'getTeamOverview').mockImplementationOnce(() =>
            Promise.resolve(team as TeamOverviewType)
        );
        jest.spyOn(API, 'getUserData').mockImplementationOnce(() =>
            Promise.resolve(lead as UserData)
        );
        jest.spyOn(API, 'getUsers').mockImplementationOnce(() =>
            Promise.resolve(users as UserData[])
        );

        await act(async () => {
            render(<TeamOverview />);
        });

        const searchbox: HTMLInputElement = screen.getByTestId('textbox-search');

        expect(searchbox).toBeInTheDocument();
    });

    it('should search for text', async () => {
        jest.spyOn(API, 'getTeamOverview').mockImplementationOnce(() =>
            Promise.resolve(team as TeamOverviewType)
        );
        jest.spyOn(API, 'getUserData').mockImplementationOnce(() =>
            Promise.resolve(lead as UserData)
        );
        jest.spyOn(API, 'getUsers').mockImplementationOnce(() =>
            Promise.resolve(users as UserData[])
        );

        await act(async () => {
            render(<TeamOverview />);
        });

        const searchbox: HTMLInputElement = screen.getByTestId('textbox-search');

        fireEvent.change(searchbox, {target: {value: 'user 3'}});

        expect(searchbox.value).toBe('user 3');

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(2);
        });
    });
});
