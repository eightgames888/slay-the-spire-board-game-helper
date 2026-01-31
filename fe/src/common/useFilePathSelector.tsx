import { useFileSelector } from "./useFileSelector";

export const useFilePathSelector = (handleFileNames: (fileNames: string[]) => void) => {
  const { inputTag, upload } = useFileSelector((files: FileList) => {
    const fileArray = Array.from(files);
    handleFileNames(fileArray.map((file) => file.name));
  });
  return {
    inputTag,
    upload,
  };
};
