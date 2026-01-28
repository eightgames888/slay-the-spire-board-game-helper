import React, { useEffect, useRef, ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string;
}

export const BottomSheet: FC<BottomSheetProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  height = '50vh' 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClick);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div 
        className={styles.content} 
        ref={contentRef} 
        style={{ height }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};