import { createServer } from "http";
import { WebSocketServer } from "ws";
import { JSONFilePreset } from "lowdb/node";

export async function useWebsocketWithLowdb<T>(app: any, defaultData: T) {
	const db = await JSONFilePreset<{
		data: T;
	}>("db.json", { data: defaultData });

	const server = createServer(app);
	const wss = new WebSocketServer({ server });

	wss.on("connection", (ws) => {
		console.log("Websocket connected");
		
		ws.send(JSON.stringify({ type: "sync", value: db.data.data }));

		ws.on("message", async (message) => {
			const { type, value } = JSON.parse(message.toString());
			if (type === "update") {
				await db.update((draft) => {
					draft.data = value;
				});
				wss.clients.forEach((client) => {
					if (client.readyState === 1) {
						client.send(JSON.stringify({ type: "sync", value: db.data.data }));
					}
				})
			}
		});
	});
	wss.on("close", () => {
		console.log("Websocket closed");
	});
	return { db, server, wss };
}
