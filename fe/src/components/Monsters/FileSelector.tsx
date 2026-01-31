import { useState, useEffect, type FC } from "react";
import { BottomSheet } from "@/common/BottomSheet";

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

  const handleConfirm = () => {
    const filePaths = Array.from(selectedFiles).map(
      (path) => `/static/slay-the-spire-mod-unpack${path}`
    );
    onSelect(filePaths);
    setSelectedFiles(new Set());
    onClose();
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.path} style={{ marginLeft: `${level * 1}rem` }}>
        {item.type === "directory" ? (
          <div>
            <div style={{ fontWeight: "bold", padding: "0.25rem 0" }}>
              📁 {item.name}
            </div>
            {item.children && renderFileTree(item.children, level + 1)}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.25rem 0",
              cursor: "pointer",
              backgroundColor: selectedFiles.has(item.path) ? "#e0e0e0" : "transparent",
            }}
            onClick={() => toggleFileSelection(item.path)}
          >
            <span style={{ marginRight: "0.5rem" }}>
              {selectedFiles.has(item.path) ? "✅" : "📄"}
            </span>
            <span>{item.name}</span>
          </div>
        )}
      </div>
    ));
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
          <h3 style={{ margin: 0 }}>选择怪兽图片</h3>
          <span>已选择: {selectedFiles.size} 个文件</span>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "0.5rem",
          }}
        >
          {fileStructure.length > 0 ? (
            renderFileTree(fileStructure)
          ) : (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              加载中...
            </div>
          )}
        </div>

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
            取消
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
            确认选择 ({selectedFiles.size})
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default FileSelector;