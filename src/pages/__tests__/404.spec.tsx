import React from 'react';
import { NotFound } from '../404';
import { render, waitFor } from '../../test-utils';

describe('<NotFound/>', () => {
  it('check 404 rendering', async () => {
    render(<NotFound />);
    await waitFor(() => {
      expect(document.title).toBe('Not Found | D-liver');
    });
  });
});
