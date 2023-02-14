import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {UserData} from 'types';
import {getTeamOverview, getUserData, getUsers} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import {mapUser, mapUsers} from './utils';

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [search, setSearch] = React.useState<string>('');
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);
            const teamMembers = await getUsers(teamMemberIds);

            setPageData({
                teamLead,
                teamMembers,
            });

            setIsLoading(false);
        };
        getTeamUsers();
    }, [teamId]);

    const members_ = React.useMemo(
        () =>
            (pageData?.teamMembers ?? []).filter(
                team =>
                    team.firstName.toLowerCase().includes(search) ||
                    team.lastName.toLowerCase().includes(search) ||
                    team.displayName.toLowerCase().includes(search)
            ),
        [search, pageData]
    );

    return (
        <Container>
            <Header
                title={`💠 ${location.state.name}`}
                showSearchBox
                SearchBox="Search Member"
                onSearch={value => {
                    setSearch(value.toLowerCase());
                }}
            />
            {!isLoading && <Card {...mapUser(pageData.teamLead, true)} />}
            <List items={mapUsers(members_, search)} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
