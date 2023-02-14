import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Team, UserData} from 'types';
import {Container, Text, Icon} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Team;
}

const Card = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}: Props): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={(e: Event) => {
                if (hasNavigation) {
                    navigate(url, {
                        state: navigationProps,
                    });
                }
                e.preventDefault();
            }}
        >
            {columns.map(({key: columnKey, value}, i) => (
                <Text key={`cardRow-${id}-${i}`}>
                    <Icon>{columnKey}</Icon>&nbsp;{value}
                </Text>
            ))}
        </Container>
    );
};

export default Card;
