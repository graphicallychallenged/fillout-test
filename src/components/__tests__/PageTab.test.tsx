import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PageTab from '../PageTab';

describe('PageTab', () => {
  const page = { id: 'p1', name: '🎉 FunTab', icon: 'info' };
  const mockSetActive = jest.fn();
  const mockContext = jest.fn();

  const renderTab = (activeId: string) => {
    render(
      <PageTab
        page={page}
        activePageId={activeId}
        setActivePageId={mockSetActive}
        handleContextMenu={mockContext}
      />
    );
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('hides the options button when not active', () => {
    renderTab('p2');
    const opts = screen.getByLabelText(/Options for 🎉 FunTab page/i);
    expect(opts).toHaveAttribute('aria-expanded', 'false');
    expect(opts).toHaveClass('opacity-0');
  });

  it('shows the options button when active', () => {
    renderTab('p1');
    const opts = screen.getByLabelText(/Options for 🎉 FunTab page/i);
    expect(opts).toHaveAttribute('aria-expanded', 'true');
    expect(opts).toHaveClass('opacity-100');
  });

  it('calls setActivePageId when clicked', () => {
    renderTab('p2');
    fireEvent.click(screen.getByRole('tab'));
    expect(mockSetActive).toHaveBeenCalledWith('p1');
  });

  it('calls handleContextMenu on right‐click', () => {
    renderTab('p2');
    fireEvent.contextMenu(screen.getByRole('tab'));
    expect(mockContext).toHaveBeenCalled();
  });
});
