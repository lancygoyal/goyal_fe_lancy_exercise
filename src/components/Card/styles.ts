import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #fff;
    color: #000;
    padding: 20px;
    width: 250px;
    min-height: 100px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 5px;
    border: 2px solid grey;
    border-radius: 5px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
`;

export const Text = styled.p`
    background-color: #fff;
    color: #000;
`;

export const Icon = styled.span`
    background-color: #fff;
    color: #000;
`;
