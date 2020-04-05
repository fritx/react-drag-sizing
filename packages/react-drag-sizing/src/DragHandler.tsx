import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragHandlerData, DragHandlerProps } from './types';

export const DragHandler: React.FC<DragHandlerProps> = props => {
  const { dir, onStart, onEnd, onUpdate, className, style, children } = props;

  const [isDragging, setIsDragging] = useState(false);
  const listenersRef = useRef<DragHandlerData['listenersRef']>(null);

  const handleMouseMove = useCallback(
    e => {
      onUpdate(e);
    },
    [onUpdate]
  );

  const cleanMouseListeners = useCallback(() => {
    const oldRef = listenersRef.current;
    if (oldRef) {
      window.removeEventListener('mousemove', oldRef.handleMouseMove);
      window.removeEventListener('mouseup', oldRef.handleMouseUp);
    }
  }, []);

  const handleMouseUp = useCallback(
    e => {
      setIsDragging(false);
      cleanMouseListeners();
      onEnd(e);
    },
    [cleanMouseListeners, onEnd]
  );

  const handleMouseDown = useCallback(
    e => {
      setIsDragging(true);
      cleanMouseListeners();

      listenersRef.current = {
        handleMouseMove,
        handleMouseUp,
      };
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      onStart(e);
    },
    [cleanMouseListeners, handleMouseMove, handleMouseUp, onStart]
  );

  useEffect(() => {
    return () => {
      cleanMouseListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      className={className}
      style={{
        cursor: `${dir}-resize`,
        ...style,
      }}
    >
      {isDragging && (
        <style>{`
        * {
          cursor: ${dir}-resize !important;
          -webkit-user-select: none !important;
        }
        `}</style>
      )}
      {children}
    </div>
  );
};
