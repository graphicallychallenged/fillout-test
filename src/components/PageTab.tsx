import React, { type FC, useRef } from 'react';
import type {
  MouseEvent as ReactMouseEvent,
} from 'react';
import type { Page } from '../types';
import { Icon } from './Icons';
import type { IconName } from './Icons';

interface PageTabProps {
  page: Page;
  activePageId: string;
  setActivePageId: React.Dispatch<React.SetStateAction<string>>;
  handleContextMenu: (
    event: ReactMouseEvent<HTMLDivElement>,
    pageId: string,
    triggerEl: HTMLElement
  ) => void;

}

const PageTab: FC<PageTabProps> = ({
  page,
  activePageId,
  setActivePageId,
  handleContextMenu,
}) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const isSelected = activePageId === page.id;
  const iconName = (page.icon?.toLowerCase() as IconName) || 'other';

  return (
    <div
      ref={tabRef}
      role="tab"
      aria-selected={isSelected}
      tabIndex={0}
      className={`
        relative flex-shrink-0 px-4 py-1.5 rounded-lg cursor-pointer
        transition-all duration-200 ease-in-out z-1
        transform transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-105

        ${isSelected
          ? 'bg-white text-gray-900 border border-[#E1E1E1] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)]'
          : 'bg-[rgba(157,164,178,0.15)] text-gray-700 border border-transparent hover:bg-[rgba(157,164,178,0.35)]'
        }

        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
      `}
      onClick={() => setActivePageId(page.id)}
      onContextMenu={e => handleContextMenu(e, page.id, tabRef.current!)}
    
    >
      <div
        className="flex items-center space-x-1 text-sm font-medium"
        style={{ letterSpacing: '-0.015em', lineHeight: '20px' }}
      >
          <Icon
            name={iconName}
            className={`h-4 w-4 mr-1.5 ${
                           isSelected ? 'text-orange-500' : 'text-gray-600'
                      }`}
          />
        <span>{page.name}</span>

    
        <div
          className={`
            rounded-full p-1 transition-opacity duration-200
            ${isSelected ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          `}
          aria-label={`Options for ${page.name} page`}
          aria-haspopup="true"
          aria-expanded={isSelected}
          onClick={e => {
            e.stopPropagation();
            handleContextMenu(e as any, page.id, e.currentTarget);
          }}
          tabIndex={isSelected ? 0 : -1}
        >
          <Icon name="options"  className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default PageTab;
