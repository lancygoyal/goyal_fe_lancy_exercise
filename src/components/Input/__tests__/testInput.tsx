import React from 'react';
import {render, screen} from '@testing-library/react';
import {TextBox} from '..';

describe('TextBox', () => {
    it('should render textbox', () => {
        render(<TextBox id="1" />);

        expect(screen.getByTestId('textbox-1')).toBeInTheDocument();
    });
});
