import express from "express";
import { type IDbData, PORT } from "shared";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { useWebsocketWithLowdb } from "./useWebsocketWithLowdb";

const app = express();

app.use(express.json());

const frontendPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../fe/dist");

app.use(express.static(frontendPath));

app.get("/", (_req, res) => {
  res.sendFile(join(frontendPath, "index.html"));
});

app.use("/static", express.static(join(dirname(fileURLToPath(import.meta.url)), "..", "static")));


const defaultData: IDbData = { monsters: [] };

const { server } = await useWebsocketWithLowdb(app, defaultData);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});