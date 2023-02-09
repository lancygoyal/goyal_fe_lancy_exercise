import styled from 'styled-components';

export const Input = styled.input`
    font-size: 1em;
    border: 2px solid grey;
    border-radius: 5px;
    padding: 6px 6px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    &:focus {
        outline: none;
        transition: border-color 0.3s ease-in-out;
        border-color: black;
    }
`;
