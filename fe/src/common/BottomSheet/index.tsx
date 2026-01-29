import React, { useEffect, useRef, ReactNode, FC } from "react";
import { createPortal } from "react-dom";

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
  height = "50vh",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        zIndex: 1000,
      }}
    >
      <div
        ref={contentRef}
        style={{ width: "100%", background: "#fff", overflowY: "auto", height }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
