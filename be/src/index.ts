import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import { JSONFilePreset } from "lowdb/node";
import { PORT, type IMonster } from "shared";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

const frontendPath = resolve(dirname(fileURLToPath(import.meta.url)), "../../fe/dist");

app.use(express.static(frontendPath));

app.get("/", (_req, res) => {
  res.sendFile(join(frontendPath, "index.html"));
});

app.use("/static", express.static(join(dirname(fileURLToPath(import.meta.url)), "..", "static")));

const defaultData = { monsters: [] as IMonster[] };
const db = await JSONFilePreset("db.json", defaultData);

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "sync", value: db.data.monsters }));

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString()) as { type: string; value: IMonster[] };
    if (data.type === "update" && Array.isArray(data.value)) {
      await db.update((d) => {
        d.monsters = data.value;
      });
      broadcastToAll({ type: "sync", value: db.data.monsters });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

function broadcastToAll(data: { type: string; value: IMonster[] }) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
