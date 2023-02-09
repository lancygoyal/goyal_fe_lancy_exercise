import styled from 'styled-components';

export const HeaderContainer = styled.div`
    display: flex;
    width: 92%;
    margin: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.h1``;

export const NavigationHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    outline: 0;
    background-color: #fff;
`;
