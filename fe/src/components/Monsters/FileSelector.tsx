import { useState, useEffect, type FC } from "react";
import { BottomSheet } from "@/common/BottomSheet";
import { FileTreeSelector } from "@/common/FileTreeSelector";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileItem[];
}

interface FileSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (filePaths: string[]) => void;
}

const FileSelector: FC<FileSelectorProps> = ({ isOpen, onClose, onSelect }) => {
  const [fileStructure, setFileStructure] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      fetch("/api/files")
        .then((res) => res.json())
        .then(setFileStructure)
        .catch(console.error);
    }
  }, [isOpen]);

  const toggleFileSelection = (filePath: string) => {
    const newSelectedFiles = new Set(selectedFiles);
    if (newSelectedFiles.has(filePath)) {
      newSelectedFiles.delete(filePath);
    } else {
      newSelectedFiles.add(filePath);
    }
    setSelectedFiles(newSelectedFiles);
  };

  const toggleFolder = (folderPath: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(folderPath)) {
      newExpandedFolders.delete(folderPath);
    } else {
      newExpandedFolders.add(folderPath);
    }
    setExpandedFolders(newExpandedFolders);
  };

  const handleConfirm = () => {
    const filePaths = Array.from(selectedFiles).map(
      (path) => `/static/slay-the-spire-mod-unpack${path}`,
    );
    onSelect(filePaths);
    setSelectedFiles(new Set());
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} height="80vh">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "0.5rem",
          }}
        >
          <h3 style={{ margin: 0 }}>Select Monster Images</h3>
          <span>Selected: {selectedFiles.size} files</span>
        </div>

        <FileTreeSelector
          fileStructure={fileStructure}
          selectedFiles={selectedFiles}
          expandedFolders={expandedFolders}
          onToggleFile={toggleFileSelection}
          onToggleFolder={toggleFolder}
          fileIcon="📄"
          folderIconOpen="📂"
          folderIconClosed="📁"
          selectedIcon="✅"
        />

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => {
              setSelectedFiles(new Set());
              onClose();
            }}
            style={{
              flex: 1,
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedFiles.size === 0}
            style={{
              flex: 1,
              padding: "0.75rem",
              border: "1px solid #007bff",
              borderRadius: "4px",
              background: selectedFiles.size === 0 ? "#ccc" : "#007bff",
              color: "white",
              cursor: selectedFiles.size === 0 ? "not-allowed" : "pointer",
            }}
          >
            Confirm ({selectedFiles.size})
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default FileSelector;
