import * as React from 'react';
import {TextBox} from 'components/Input';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
    showSearchBox?: boolean;
    SearchBox?: string;
    onSearch?: (val) => void;
}

const Header = ({title, showBackButton = true, showSearchBox, SearchBox, onSearch}: Props) => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <NavigationHeader>
                {showBackButton && (
                    <BackButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        ↩️
                    </BackButton>
                )}
                <Title>{title}</Title>
            </NavigationHeader>
            {showSearchBox && (
                <TextBox
                    placeholder={SearchBox}
                    onType={value => {
                        onSearch(value.toLowerCase());
                    }}
                />
            )}
        </HeaderContainer>
    );
};

export default Header;
