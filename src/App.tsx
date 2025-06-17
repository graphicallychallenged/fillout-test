import { type FC, useState } from 'react';
import PageNavigationBar from './components/PageNavigationBar';
import type { Page } from './types';
import { type IconName } from './components/Icons'; 
const App: FC = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: 'page-1', name: 'Info', icon: 'info' },
    { id: 'page-2', name: 'Details', icon: 'details' },
    { id: 'page-3', name: 'Other', icon: 'other' },
    { id: 'page-4', name: 'Ending', icon: 'ending' },
  ]);
  const [activePageId, setActivePageId] = useState<string>('page-1');

  const generateId = () => `page-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const addPage = (index: number, name: string, icon: string) => {
  const newPage = { id: generateId(), name, icon: icon as IconName };
  const newPages = [...pages];
  newPages.splice(index, 0, newPage);
  setPages(newPages);
  setActivePageId(newPage.id);
};

  const reorderPages = (from: string, to: string) => {
    setPages(prev => {
      const arr = [...prev];
      const i = arr.findIndex(p => p.id === from);
      const j = arr.findIndex(p => p.id === to);
      if (i === -1 || j === -1) return prev;
      const [moved] = arr.splice(i, 1);
      arr.splice(j, 0, moved);
      return arr;
    });
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col">
      <header className="p-4 text-xl font-bold text-gray-900 w-screen">Fillout Frontend Test</header>
      <p className="px-4 text-sm text-gray-900 w-screen">By Nyree Mompoint</p>
      <main className="flex-grow flex items-center justify-center text-gray-700 w-screen">
        Active Page: <strong>{pages.find(p => p.id === activePageId)?.name}</strong>
      </main>
      <footer className="p-0 bg-white w-screen">
        <PageNavigationBar
          pages={pages}
          activePageId={activePageId}
          setActivePageId={setActivePageId}
          addPage={addPage}
          reorderPages={reorderPages}
        />
      </footer>
    </div>
  );
};

export default App;
