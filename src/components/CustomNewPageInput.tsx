import React, { type FC, useState, useRef, useEffect } from 'react';
import { Icon, ICONS } from './Icons'; 

interface CustomNewPageInputProps {
  isVisible: boolean;
  onConfirm: (name: string, icon: string) => void;
  onCancel: () => void;
  triggerElement: HTMLElement | null;
}

const CustomNewPageInput: FC<CustomNewPageInputProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  triggerElement
}) => {
  const [pageName, setPageName] = useState('New Page');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedIcon, setSelectedIcon] = useState<string>(ICONS[0]);

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();

      const focusableElementsString =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
      const focusableModalElements: NodeListOf<HTMLElement> = modalRef.current
        ? modalRef.current.querySelectorAll(focusableElementsString)
        : (null as any);

      const firstFocusableElement =
        focusableModalElements && focusableModalElements.length > 0
          ? focusableModalElements[0]
          : null;
      const lastFocusableElement =
        focusableModalElements && focusableModalElements.length > 0
          ? focusableModalElements[focusableModalElements.length - 1]
          : null;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    } else {
      triggerElement?.focus();
    }
  }, [isVisible, triggerElement]);

  if (!isVisible) return null;

  const handleConfirm = () => {
    if (pageName.trim() !== '') {
      onConfirm(pageName.trim(), selectedIcon);     // ← pass the icon here
      setPageName('New Page');
      setSelectedIcon(ICONS[0]);                    // ← reset to your default
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center space-y-3"
      >
         <form
          onSubmit={e => {
            e.preventDefault();
            handleConfirm();
          }}
          className="flex flex-col items-center space-y-3"
        > 
        <h3
          className="text-sm font-medium text-gray-900"
          style={{ lineHeight: '20px', letterSpacing: '-0.015em' }}
        >
          Name New Page
        </h3>
        <input
          type="text"
          className="w-56 px-3 py-3 rounded-md bg-gray-100 text-sm text-gray-900 border border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          value={pageName}
          onChange={e => setPageName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          autoFocus
          aria-label="New page name"
        />
          {/* icon picker */}
          <div className="w-full grid grid-cols-6 gap-2 overflow-x-auto py-2 px-3">
            {ICONS.map(iconName => (
              <button
                key={iconName}
                type="button"
                onClick={() => setSelectedIcon(iconName)}
                className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                  selectedIcon === iconName
                    ? 'bg-blue-100 ring-2 ring-blue-500'
                    : 'hover:bg-gray-100'
                }`}
                aria-label={`Select ${iconName} icon`}
              >
                <Icon
                  name={iconName as any}
                  className={`h-5 w-5 ${
                    selectedIcon === iconName ? 'text-orange-500' : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
        <div className="flex space-x-3">
          <button
            className="px-4 py-1.5 bg-blue-600 text-sm text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleConfirm}
          >
            Create Page
          </button>
          <button
            className="px-4 py-1.5 bg-gray-300 text-sm text-gray-800 rounded-md hover:bg-gray-400 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default CustomNewPageInput;
