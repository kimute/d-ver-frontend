import { render, screen } from '@testing-library/react';
import React from 'react';
import { FormError } from '../form-error';

describe('<FormError>', () => {
  it('check formError with props', () => {
    render(<FormError errorMessage={'form error test'} />);
  });
  screen.queryByText('form error test');
});
