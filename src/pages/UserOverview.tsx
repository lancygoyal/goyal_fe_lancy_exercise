import * as React from 'react';
import {useLocation} from 'react-router-dom';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import {mapUser} from './utils';

const UserOverview = () => {
    const location = useLocation();
    return (
        <Container>
            <Header title={`User ${location.state.firstName} ${location.state.lastName}`} />
            <Card {...mapUser(location.state, location.state.isTL)} />
        </Container>
    );
};

export default UserOverview;
