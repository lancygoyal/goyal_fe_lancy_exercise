/* eslint-disable testing-library/no-unnecessary-act */
import * as React from 'react';
import {render, screen, act, fireEvent} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {},
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        await act(async () => {
            render(<Teams />);
        });

        expect(screen.getByText('Team1')).toBeInTheDocument();

        expect(screen.getByText('Team2')).toBeInTheDocument();
    });

    it('should render search textbox', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        await act(async () => {
            render(<Teams />);
        });

        const searchbox: HTMLInputElement = screen.getByTestId('textbox-search');

        expect(searchbox).toBeInTheDocument();
    });

    it('should search for text', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        await act(async () => {
            render(<Teams />);
        });

        const searchbox: HTMLInputElement = screen.getByTestId('textbox-search');

        fireEvent.change(searchbox, {target: {value: 'Team1'}});

        expect(searchbox.value).toBe('Team1');

        expect(screen.getByText('Team1')).toBeInTheDocument();
    });
});
