import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {TextBox} from '..';

describe('TextBox', () => {
    it('should render textbox', () => {
        render(<TextBox id="1" />);

        expect(screen.getByTestId('textbox-1')).toBeInTheDocument();
    });

    it('on typing in textbox it should invoke the onSearch function', () => {
        const onType = jest.fn();

        render(<TextBox id="1" onType={onType} />);

        const textbox: HTMLInputElement = screen.getByTestId('textbox-1');

        fireEvent.change(textbox, {target: {value: 'hello'}});

        expect(textbox.value).toBe('hello');

        expect(onType).toHaveBeenCalledWith(expect.stringContaining('hello'));
    });
});
