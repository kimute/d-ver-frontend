import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Restaurant } from '../restaurant';

describe('<Restaurant/>', () => {
  const props = {
    id: '1',
    coverImg: 'testImag',
    name: 'testName',
    categoryName: 'testCategoryName',
  };
  it('check Restaurant with props', () => {
    const { container } = render(
      <Router>
        <Restaurant {...props} />
      </Router>,
    );
    screen.queryByText(props.name);
    screen.queryByText(props.categoryName);
    expect(container.firstChild).toHaveAttribute(
      'href',
      `/restaurant/${props.id}`,
    );
  });
});
