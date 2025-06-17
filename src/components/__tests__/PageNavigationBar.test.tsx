import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PageNavigationBar from '../PageNavigationBar';
import type { Page } from '../../types';

function createDataTransfer(): DataTransfer {
  const store: Record<string, string> = {};
  const dt = {
    setData(format: string, data: string) {
      store[format] = data;
    },
    getData(format: string) {
      return store[format] || '';
    },
    clearData() {
      Object.keys(store).forEach(key => delete store[key]);
    },
    dropEffect: 'move',
    effectAllowed: 'move',
    setDragImage: () => {},
  };
  return dt as unknown as DataTransfer;
}

describe('PageNavigationBar', () => {
  const pages: Page[] = [
    { id: 'p1', name: 'Info', icon: 'info' },
    { id: 'p2', name: 'Details', icon: 'details' },
    { id: 'p3', name: 'Other', icon: 'other' },
  ];
  const mockSetActive = jest.fn();
  const mockAddPage   = jest.fn();
  const mockReorder   = jest.fn();
  let dt: DataTransfer;

  const renderNav = () =>
    render(
      <PageNavigationBar
        pages={pages}
        activePageId="p1"
        setActivePageId={mockSetActive}
        addPage={mockAddPage}
        reorderPages={mockReorder}
      />
    );

  beforeEach(() => {
    dt = createDataTransfer();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders one tab per page + the final + Add page button', () => {
    renderNav();
    pages.forEach(p => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
    expect(screen.getByText('+ Add page')).toBeInTheDocument();
  });

  it('calls setActivePageId when you click a tab', () => {
    renderNav();
    fireEvent.click(screen.getByText('Details'));
    expect(mockSetActive).toHaveBeenCalledWith('p2');
  });

  it('opens the new-page modal when you click + Add page', () => {
    renderNav();
    fireEvent.click(screen.getByText('+ Add page'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('New page name')).toHaveValue('New Page');
  });

  it('creates a new page when you type a name and click Create Page', () => {
    renderNav();
    fireEvent.click(screen.getByText('+ Add page'));
    const input = screen.getByLabelText('New page name');
    fireEvent.change(input, { target: { value: 'My New Page' } });
    fireEvent.click(screen.getByText('Create Page'));
    expect(mockAddPage).toHaveBeenCalledWith(
      expect.any(Number),
      'My New Page',
      expect.any(String)
    );
  });

  it('closes the modal when you cancel', () => {
    renderNav();
    fireEvent.click(screen.getByText('+ Add page'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('invokes reorderPages on drag and drop and cleans up classes', () => {
    renderNav();
    const tabs   = screen.getAllByRole('tab');
    const source = tabs[0].closest('[data-page-id]') as HTMLElement;
    const target = tabs[2].closest('[data-page-id]') as HTMLElement;

    fireEvent.dragStart(source, { dataTransfer: dt });
    expect(source).toHaveClass('opacity-50');

    fireEvent.dragOver(target, { dataTransfer: dt });
    expect(target).toHaveClass('border-2');

    fireEvent.dragLeave(target);
    expect(target).not.toHaveClass('border-2');

    fireEvent.dragStart(source, { dataTransfer: dt });
    fireEvent.dragOver(target, { dataTransfer: dt });
    fireEvent.drop(target, { dataTransfer: dt });
    expect(mockReorder).toHaveBeenCalledWith('p1', 'p3');

    fireEvent.dragEnd(source);
    expect(source).not.toHaveClass('opacity-50');
  });

  it('opens and then closes the context menu on right-click/outside click', () => {
    renderNav();
    const infoTab = screen.getByText('Info');
    fireEvent.contextMenu(infoTab);
    expect(screen.getByRole('menu')).toBeVisible();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('opens the ContextMenu when you right-click on a tab and closes it', () => {
    renderNav();

    const detailsTab = screen.getByText('Details');
    fireEvent.contextMenu(detailsTab);

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();

    fireEvent.keyDown(menu, { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();

    fireEvent.contextMenu(detailsTab);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.mouseDown(document.body); 
    expect(screen.queryByRole('menu')).toBeNull();
  });
});
