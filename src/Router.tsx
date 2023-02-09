import * as React from 'react';
import {createBrowserRouter, useRouteError} from 'react-router-dom';
import TeamOverview from './pages/TeamOverview';
import Teams from './pages/Teams';
import UserOverview from './pages/UserOverview';

function ErrorBoundary() {
    const error: any = useRouteError();
    return (
        <div>
            <p>Something went wrong.</p>
            {error.message && <span>Here is the error: {error.message}</span>}
        </div>
    );
}

export default createBrowserRouter([
    {
        path: '/',
        element: <Teams />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/team/:teamId',
        element: <TeamOverview />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/user/:useId',
        element: <UserOverview />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/*',
        element: <div>404</div>,
    },
]);
