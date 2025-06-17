import  { type FC, useRef} from 'react';
import type { RefObject } from 'react';
import { Icon } from './Icons'; 

interface ContextMenuProps {
  visible: boolean;
  x: number;
  y: number; 
  onClose: () => void;
  menuRef: RefObject<HTMLDivElement | null>
  pageName?:string;
}

const ContextMenu: FC<ContextMenuProps> = ({
  visible,
  x,
  y,
  pageName,
  onClose,
  menuRef
}) => {
  const firstMenuItemRef = useRef<HTMLButtonElement>(null); 

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      className="absolute z-50 bg-white text-gray-800 rounded-lg shadow-lg py-2 transition-all duration-150 ease-out min-w-[160px] focus-visible:outline-none"
      style={{ bottom: y, left: x }}
      tabIndex={-1}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          onClose();
        }
        const items = Array.from(
          menuRef.current?.querySelectorAll('[role="menuitem"]') || []
        ) as HTMLElement[];
        const idx = items.indexOf(document.activeElement as HTMLElement);
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          items[(idx + 1) % items.length]?.focus();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          items[(idx - 1 + items.length) % items.length]?.focus();
        }
      }}
    >
      <div className="text-md px-4 pt-2 pb-1 text-gray-500 font-semibold">
        Settings
      </div>

      <button
        ref={firstMenuItemRef}
        role="menuitem"
        className="flex items-center w-full text-left px-3 py-1.5 hover:bg-gray-100 transition-colors duration-100 text-sm font-medium"
        style={{ lineHeight: '20px', letterSpacing: '-0.015em' }}
      >
        <Icon name="document" className="h-5 w-5 mr-3 text-gray-600" />
        Set as first page
      </button>
      <button
        role="menuitem"
        className="flex items-center w-full text-left px-3 py-1.5 hover:bg-gray-100 transition-colors duration-100 text-sm font-medium"
        style={{ lineHeight: '20px', letterSpacing: '-0.015em' }}
      >
        <Icon name="rename" className="h-5 w-5 mr-3 text-gray-600" />
        Rename
      </button>
      <button
        role="menuitem"
        className="flex items-center w-full text-left px-3 py-1.5 hover:bg-gray-100 transition-colors duration-100 text-sm font-medium"
        style={{ lineHeight: '20px', letterSpacing: '-0.015em' }}
      >
        <Icon name="copy" className="h-5 w-5 mr-3 text-gray-600" />
        Copy
      </button>
      <button
        role="menuitem"
        className="flex items-center w-full text-left px-3 py-1.5 hover:bg-gray-100 transition-colors duration-100 text-sm font-medium"
        style={{ lineHeight: '20px', letterSpacing: '-0.015em' }}
      >
        <Icon name="duplicate" className="h-5 w-5 mr-3 text-gray-600" />
        Duplicate
      </button>
      <button
        role="menuitem"
        className="flex items-center w-full text-left px-3 py-1.5 text-red-500 hover:bg-gray-100 transition-colors duration-100 text-sm font-medium"
        style={{ lineHeight: '20px', letterSpacing: '-0.015em' }}
      >
        <Icon name="trash" className="h-5 w-5 mr-3" />
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;
