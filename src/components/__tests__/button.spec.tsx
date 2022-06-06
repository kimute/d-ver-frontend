import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../button';

describe('<Button/>', () => {
  it('check rendergin with props', () => {
    render(
      <Button clickOk={true} loading={false} actionText={'Button test'} />,
    );
    screen.queryByText('Button test');
    render(<Button clickOk={true} loading={true} actionText={'Button test'} />);
    screen.queryByText('Loading...');
  });

  it('check Loading on screen & click deactivated', () => {
    const {container} =render(
      <Button clickOk={false} loading={true} actionText={'Button test'} />,
    );
    screen.queryByText('Loading...');
    expect(container.firstChild).toHaveClass("bg-gray-300 pointer-events-none ")
  })
  
});
