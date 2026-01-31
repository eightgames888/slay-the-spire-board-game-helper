import express from "express";
import { type IDbData, PORT } from "shared";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { readdirSync, statSync } from "fs";
import { useWebsocketWithLowdb } from "./useWebsocketWithLowdb";

const app = express();

app.use(express.json());

const frontendPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../fe/dist");

app.use(express.static(frontendPath));

app.get("/", (_req, res) => {
  res.sendFile(join(frontendPath, "index.html"));
});

app.use("/static", express.static(join(dirname(fileURLToPath(import.meta.url)), "..", "static")));

const staticPath = join(dirname(fileURLToPath(import.meta.url)), "..", "static");

app.get("/api/files", (req, res) => {
  const basePath = join(staticPath, "slay-the-spire-mod-unpack");

  const getDirectoryStructure = (dirPath: string, baseUrl: string) => {
    const items = readdirSync(dirPath);
    const result: Array<{
      name: string;
      path: string;
      type: "file" | "directory";
      children?: Array<any>;
    }> = [];

    for (const item of items) {
      const fullPath = join(dirPath, item);
      const stat = statSync(fullPath);
      const relativePath = fullPath.replace(basePath, "").replace(/\\/g, "/");

      if (stat.isDirectory()) {
        const children = getDirectoryStructure(fullPath, baseUrl);
        result.push({
          name: item,
          path: relativePath,
          type: "directory",
          children: children.filter(
            (child) => child.type === "file" || (child.children && child.children.length > 0),
          ),
        });
      } else if (stat.isFile() && /\.(png|jpg|jpeg|gif|webp)$/i.test(item)) {
        result.push({
          name: item,
          path: relativePath,
          type: "file",
        });
      }
    }

    return result.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === "directory" ? -1 : 1;
    });
  };

  try {
    const structure = getDirectoryStructure(basePath, "/static/slay-the-spire-mod-unpack");
    res.json(structure);
  } catch (error) {
    res.status(500).json({ error: "Failed to read directory structure" });
  }
});

const defaultData: IDbData = { monsters: [] };

const { server } = await useWebsocketWithLowdb(app, defaultData);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
