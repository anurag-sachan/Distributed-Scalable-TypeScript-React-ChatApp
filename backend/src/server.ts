import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "redis";

const pub = createClient({ url: 'redis://redis:6379' });
const sub = createClient({ url: 'redis://redis:6379' });

async function start() {
  try {
    await pub.connect();
    await sub.connect();

    const wss = new WebSocketServer({ port: 8080 });
    wss.on("connection", (ws: WebSocket) => {
      ws.on("message", async (message) => {
        await pub.publish("chat", message.toString());
      });
    });

    sub.subscribe("chat", (message) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    console.log("WebSocket server running on ws://localhost:8080");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
}

start();
