import React, {
  type FC,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import type {
  MouseEvent as ReactMouseEvent,
  DragEvent as ReactDragEvent,
} from 'react';
import PageTab from './PageTab';
import ContextMenu from './ContextMenu';
import CustomNewPageInput from './CustomNewPageInput';
import { Icon } from './Icons';     
import type { Page, ContextMenuState } from '../types';

interface PageNavigationBarProps {
  pages: Page[];
  activePageId: string;
  setActivePageId: React.Dispatch<React.SetStateAction<string>>;
  addPage: (index: number, name: string, icon: string) => void;
  reorderPages: (draggedId: string, targetId: string) => void;
}

const PageNavigationBar: FC<PageNavigationBarProps> = ({
  pages,
  activePageId,
  setActivePageId,
  addPage,
  reorderPages,
}) => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    pageId: null,
    triggerElement: null,
  });
  const contextMenuRef = useRef<HTMLDivElement | null>(null)
  const [showNewPageInput, setShowNewPageInput] = useState(false);
  const [newPageInsertIndex, setNewPageInsertIndex] = useState<number | null>(null);
  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // close context menu on outside click
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(e.target as Node)
    ) {
      // grab the element that opened the menu
      const triggerEl = contextMenu.triggerElement;
      // hide the menu
      setContextMenu(menu => ({ ...menu, visible: false }));
      // restore focus
      triggerEl?.focus();
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [contextMenu.triggerElement]);

   // Show context menu positioned above/below the tab
   const handleContextMenu = (
    e: ReactMouseEvent<HTMLDivElement>,
    pageId: string,
    triggerEl: HTMLElement
  ) => {
    e.preventDefault();
    setLastFocusedElement(triggerEl);

    const rect = triggerEl.getBoundingClientRect();
    const navContainer = triggerEl.closest('div[role="tablist"]') as HTMLElement;
    const navRect = navContainer?.getBoundingClientRect();
    const menuEl = contextMenuRef.current;
    const menuHeight = menuEl?.offsetHeight || 160;
    const menuWidth = menuEl?.offsetWidth || 160;
    const gap = 50;

    // horizontal: center over trigger and clamp
    let x = navRect
      ? rect.left - navRect.left + rect.width / 2 - menuWidth / 2
      : e.clientX - menuWidth / 2;
    if (navRect) {
      x = Math.max(0, Math.min(x, navRect.width - menuWidth));
    }

    // vertical: above if enough space else below
    let y: number;
    if (navRect) {
      const spaceAbove = rect.top - navRect.top;
      if (spaceAbove >= menuHeight + gap) {
        // place above with small gap
        y = navRect.height - spaceAbove - gap;
      } else {
        // place below with small gap
        y = navRect.height - (rect.bottom - navRect.top) + gap;
      }
    } else {
      y = window.innerHeight - e.clientY - menuHeight / 2;
    }

    setContextMenu({ visible: true, x, y, pageId, triggerElement: triggerEl });
  };

  // “New page” modal triggers
  const triggerAddPageInput = (idx: number, el: HTMLElement) => {
    setLastFocusedElement(el);
    setNewPageInsertIndex(idx);
    setShowNewPageInput(true);
  };
  const handleNewPageConfirm = (name: string, icon: string) => {
    if (newPageInsertIndex != null) {
      addPage(newPageInsertIndex, name, icon);
    }
    setShowNewPageInput(false);
    lastFocusedElement?.focus();
  };
  
  const handleNewPageCancel = () => {
    setShowNewPageInput(false);
    lastFocusedElement?.focus();
  };


const handleDragStart = (e: ReactDragEvent<HTMLDivElement>, id: string) => {
  setDraggedItemId(id);
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', id);
  e.currentTarget.classList.add(
    'opacity-50',
    'scale-105',
    'shadow-lg',
    'cursor-grabbing'
  );
};

const handleDragOver = (e: ReactDragEvent<HTMLDivElement>) => {
  e.preventDefault();               // allow drop
  e.dataTransfer.dropEffect = 'move';
  const tgt = e.currentTarget as HTMLElement;
  if (tgt.dataset.pageId !== draggedItemId) {
    tgt.classList.add(
      'border-2',
      'border-dashed',
      'border-blue-500',
      'bg-blue-50',
      'scale-105'
    );
  }
};

const handleDragLeave = (e: ReactDragEvent<HTMLDivElement>) => {
  e.currentTarget.classList.remove(
    'border-2',
    'border-dashed',
    'border-blue-500',
    'bg-blue-50',
    'scale-105'
  );
};

const handleDrop = (e: ReactDragEvent<HTMLDivElement>, targetId: string) => {
  e.preventDefault();
  if (draggedItemId && draggedItemId !== targetId) {
    reorderPages(draggedItemId, targetId);
  }
  setDraggedItemId(null);

  // clear highlights from all tabs
  document
    .querySelectorAll('[data-page-id]')
    .forEach(el =>
      el.classList.remove(
        'border-2',
        'border-dashed',
        'border-blue-500',
        'bg-blue-50',
        'scale-105'
      )
    );
};

const handleDragEnd = () => {
  setDraggedItemId(null);
  document
    .querySelectorAll('[data-page-id]')
    .forEach(el =>
      el.classList.remove(
        'opacity-50',
        'scale-105',
        'shadow-lg',
        'cursor-grabbing',
        'border-2',
        'border-dashed',
        'border-blue-500',
        'bg-blue-50'
      )
    );
};

  return (
    <div className="relative w-full bg-white rounded-xl p-4 py-4 overflow-visible" role="tablist">
      <div className="flex overflow-x-auto whitespace-nowrap px-4 py-4">
        <div className="inline-flex items-center">
          {/* plus before first tab */}
            <div className="relative flex items-center group px-2">
              {/* dashed line under */}
              <button
                className="relative z-10 w-6 h-6 flex items-center justify-center
                          bg-white border border-gray-300 rounded-full
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-200"
                onClick={e => triggerAddPageInput(0, e.currentTarget)}
                aria-label="Add new page before first"
              >
                <Icon name="plus" className="w-3 h-3 text-gray-600" />
              </button>
            </div>

          {pages.map((page, idx) => (
            <React.Fragment key={page.id}>
              <div
                  data-page-id={page.id}
                  onDragStart={e => handleDragStart(e, page.id)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={e => handleDrop(e, page.id)}
                  onDragEnd={handleDragEnd}
                  draggable
                >
              <PageTab
                page={page}
                activePageId={activePageId}
                setActivePageId={setActivePageId}
                handleContextMenu={handleContextMenu}
              />
            </div>
              {/* only between tabs */}
              {idx < pages.length - 1 && (
                <div className="relative flex items-center group px-2">
                  {/* dashed line */}
                  <div
                    className="absolute inset-y-1/2 left-0 right-0 transform -translate-y-1/2 border-t border-dashed border-gray-300 pointer-events-none"
                  />
                  {/* plus-on-hover */}
                  <button
                    className="relative z-10 w-6 h-6 flex items-center justify-center
                    bg-white border border-gray-300 rounded-full
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                    transition-transform duration-200 ease-out
                    active:rotate-45"
                    onClick={e => triggerAddPageInput(idx+1, e.currentTarget)}
                    aria-label={`Add new page after ${page.name}`}
                  >
                    <Icon name="plus" className="w-3 h-3 text-gray-600" />
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* final “+ Add page” */}
          <button
            className="flex-shrink-0 ml-4 px-4 py-2 bg-white text-gray-900 rounded-lg shadow border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors duration-200 text-sm transform transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-105"
            onClick={e => triggerAddPageInput(pages.length, e.currentTarget)}
            aria-label="Add new page"
          >
            + Add page
          </button>
        </div>
      </div>

      <ContextMenu
        visible={contextMenu.visible}
        x={contextMenu.x}
        y={contextMenu.y}
        onClose={() => {
                  const trigger = contextMenu.triggerElement;
                 setContextMenu(state => ({ ...state, visible: false }));
                  trigger?.focus();
               }}
        menuRef={contextMenuRef}
      />
      <CustomNewPageInput
        isVisible={showNewPageInput}
        onConfirm={(name: string, icon: string) => handleNewPageConfirm(name, icon)}
        onCancel={handleNewPageCancel}
        triggerElement={lastFocusedElement}
      />
    </div>
  );
};

export default PageNavigationBar;
