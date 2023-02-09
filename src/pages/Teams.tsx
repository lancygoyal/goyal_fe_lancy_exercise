import * as React from 'react';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import {mapTeams} from './utils';
import {getTeams as fetchTeams} from '../api';

const Teams = () => {
    const [search, setSearch] = React.useState<any>('');
    const [teams, setTeams] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<any>(true);

    React.useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            setTeams(response);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    const teams_ = React.useMemo(
        () => teams.filter(team => team.name.toLowerCase().includes(search)),
        [search, teams]
    );

    return (
        <Container>
            <Header
                title="Teams"
                showBackButton={false}
                showSearchBox
                SearchBox="Search Team"
                onSearch={value => {
                    setSearch(value.toLowerCase());
                }}
            />
            <List items={mapTeams(teams_, search)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
