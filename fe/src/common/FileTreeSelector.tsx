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
  showSearch?: boolean;
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
  selectedIcon = "✅",
  showSearch = true
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 递归搜索函数，只匹配文件名（叶子节点）
  const searchFiles = (items: FileItem[], search: string): FileItem[] => {
    if (!search.trim()) return items;
    
    const results: FileItem[] = [];
    
    for (const item of items) {
      // 如果是文件（叶子节点），检查文件名是否匹配
      if (item.type === "file") {
        if (item.name.toLowerCase().includes(search.toLowerCase())) {
          results.push(item);
        }
      } else if (item.type === "directory" && item.children) {
        // 如果是目录，递归搜索子项
        const childResults = searchFiles(item.children, search);
        if (childResults.length > 0) {
          // 只添加包含匹配文件的目录
          results.push({
            ...item,
            children: childResults
          });
        }
      }
    }
    
    return results;
  };

  const filteredStructure = searchTerm ? searchFiles(fileStructure, searchTerm) : fileStructure;
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
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {showSearch && (
        <div style={{ marginBottom: "0.5rem" }}>
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>
      )}
      
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "0.5rem",
        }}
      >
        {filteredStructure.length > 0 ? (
          renderFileTree(filteredStructure)
        ) : fileStructure.length > 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
            No files found matching "{searchTerm}"
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};