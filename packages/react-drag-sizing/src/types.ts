export interface DragHandlerProps {
  dir: 'ew' | 'ns';
  onStart: (e: MouseEvent) => void;
  onEnd: (e: MouseEvent) => void;
  onUpdate: (e: MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface DragHandlerData {
  listenersRef: {
    handleMouseMove: (e: MouseEvent) => void;
    handleMouseUp: (e: MouseEvent) => void;
  } | null;
}

export interface DragSizingProps {
  border: 'top' | 'bottom' | 'left' | 'right';
  onStart?: DragHandlerProps['onStart'];
  onEnd?: DragHandlerProps['onEnd'];
  onUpdate?: DragHandlerProps['onUpdate'];
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  handlerClassName?: string;
  handlerStyle?: React.CSSProperties;
  handlerWidth?: number;
  handlerOffset?: number;
  handlerZIndex?: number;
}

export interface DragSizingData {
  diffCoord: number;
  oldCorrd: number | null;
  oldSize: number | null;
}
