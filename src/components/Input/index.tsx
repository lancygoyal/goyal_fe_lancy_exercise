import * as React from 'react';
import {Input} from './styles';

interface Props {
    id?: string;
    type?: string;
    placeholder?: string;
    onType?: (val) => void;
}

export const TextBox = ({
    id,
    type = 'text',
    placeholder = 'Please type here',
    onType,
    ...props
}: Props) => {
    return (
        <Input
            data-testid={`textbox-${id}`}
            type={type}
            autoFocus
            placeholder={placeholder}
            onChange={e => {
                onType(e.target.value);
            }}
            {...props}
        />
    );
};
