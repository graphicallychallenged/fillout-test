
import { render, screen, fireEvent } from '@testing-library/react';
import CustomNewPageInput from '../CustomNewPageInput';
import { ICONS } from '../Icons';

describe('CustomNewPageInput', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const triggerEl = document.createElement('button');

  const renderModal = (visible: boolean) =>
    render(
      <CustomNewPageInput
        isVisible={visible}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        triggerElement={triggerEl}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when hidden', () => {
    renderModal(false);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders the dialog when visible', () => {
    renderModal(true);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Name New Page')).toBeInTheDocument();
  });

  it('focuses on the text input', () => {
    renderModal(true);
    const input = screen.getByLabelText('New page name');
    expect(document.activeElement).toBe(input);
  });

  it('submits on Enter key', () => {
    renderModal(true);
    const input = screen.getByLabelText('New page name');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnConfirm).toHaveBeenCalledWith('Hello', ICONS[0]);
  });

  it('submits with chosen icon and Create Page click', () => {
    renderModal(true);
    // pick the 2nd icon
    const second = ICONS[1];
    fireEvent.click(screen.getByLabelText(`Select ${second} icon`));
    // now click Create Page
    fireEvent.click(screen.getByRole('button', { name: /create page/i }));
    expect(mockOnConfirm).toHaveBeenCalledWith('New Page', second);
  });

  it('cancels on Escape key', () => {
    renderModal(true);
    const input = screen.getByLabelText('New page name');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('cancels on Cancel button click', () => {
    renderModal(true);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
