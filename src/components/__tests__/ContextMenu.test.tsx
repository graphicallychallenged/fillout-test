import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContextMenu from '../ContextMenu';
 
describe('ContextMenu component', () => {
  const defaultProps = {
    visible: false,
    x: 10,
    y: 20,
    pageName: 'TestPage',
    onClose: jest.fn(),
    menuRef: React.createRef<HTMLDivElement>()
  };

  it('does not render when visible is false', () => {
    const { queryByRole } = render(<ContextMenu {...defaultProps} />);
    expect(queryByRole('menu')).toBeNull();
  });

  it('renders menu and items correctly when visible is true', () => {
    const props = { ...defaultProps, visible: true };
    const { getByRole, getByText } = render(<ContextMenu {...props} />);

    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(getByText('Settings')).toBeInTheDocument();
    expect(getByText('Set as first page')).toBeInTheDocument();
    expect(getByText('Rename')).toBeInTheDocument();
    expect(getByText('Copy')).toBeInTheDocument();
    expect(getByText('Duplicate')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });

  it('positions menu with correct inline styles', () => {
    const props = { ...defaultProps, visible: true, x: 30, y: 40 };
    const { getByRole } = render(<ContextMenu {...props} />);
    const menu = getByRole('menu');
    expect(menu).toHaveStyle({ left: '30px', bottom: '40px' });
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = jest.fn();
    const props = { ...defaultProps, visible: true, onClose };
    const { getByRole } = render(<ContextMenu {...props} />);
    const menu = getByRole('menu');

    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('cycles focus to next and previous menu items with arrow keys', () => {
    const props = { ...defaultProps, visible: true };
    const { getByRole, getAllByRole } = render(<ContextMenu {...props} />);
    const items = getAllByRole('menuitem');

    // focus first item
    items[0].focus();
    expect(document.activeElement).toBe(items[0]);

    // ArrowDown moves to second item
    fireEvent.keyDown(getByRole('menu'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[1]);

    // ArrowUp from second goes back to first
    fireEvent.keyDown(getByRole('menu'), { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[0]);
  });
});
