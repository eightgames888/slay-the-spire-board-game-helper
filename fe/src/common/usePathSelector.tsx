import { useRef } from "react";

export const usePathSelector = (handleFiles: (files: FileList) => void) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputTag = (
    <input
      type="file"
      multiple
      accept="image/png"
      onChange={(event) => {
        const files = event.target?.files;
        if (files) handleFiles(files);
      }}
      style={{ display: "none" }}
      ref={fileInputRef}
    />
  );
  const upload = () => {
    fileInputRef.current?.click();
  };
  return {
    inputTag,
    upload,
  };
};
