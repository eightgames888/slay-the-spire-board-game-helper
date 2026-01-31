import { useState, useEffect, type FC } from "react";

interface FileItem {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileItem[];
}

interface FileTreeSelectorProps {
  fileStructure: FileItem[];
  selectedFiles: Set<string>;
  expandedFolders: Set<string>;
  onToggleFile: (filePath: string) => void;
  onToggleFolder: (folderPath: string) => void;
  fileIcon?: string;
  folderIconOpen?: string;
  folderIconClosed?: string;
  selectedIcon?: string;
}

export const FileTreeSelector: FC<FileTreeSelectorProps> = ({
  fileStructure,
  selectedFiles,
  expandedFolders,
  onToggleFile,
  onToggleFolder,
  fileIcon = "🃏",
  folderIconOpen = "📂",
  folderIconClosed = "📁",
  selectedIcon = "✅"
}) => {
  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.path}>
        {item.type === "directory" ? (
          <div>
            <div 
              style={{ 
                fontWeight: "bold", 
                padding: "0.25rem 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginLeft: `${level * 1}rem`
              }}
              onClick={() => onToggleFolder(item.path)}
            >
              <span style={{ marginRight: "0.5rem" }}>
                {expandedFolders.has(item.path) ? folderIconOpen : folderIconClosed}
              </span>
              <span>{item.name}</span>
            </div>
            {item.children && expandedFolders.has(item.path) && (
              <div style={{ display: "block" }}>
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.25rem 0",
              cursor: "pointer",
              backgroundColor: selectedFiles.has(item.path) ? "#e0e0e0" : "transparent",
              marginLeft: `${level * 1}rem`
            }}
            onClick={() => onToggleFile(item.path)}
          >
            <span style={{ marginRight: "0.5rem" }}>
              {selectedFiles.has(item.path) ? selectedIcon : fileIcon}
            </span>
            <span>{item.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
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
  );
};