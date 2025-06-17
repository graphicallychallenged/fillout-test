export interface Page {
    id: string;
    name: string;
    icon?: string;
  }
  
  export interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    pageId: string | null;
    triggerElement: HTMLElement | null;
  }