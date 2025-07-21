import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port:8080});
let userCount=1;
let allSockets: WebSocket[] = [];

wss.on("connection",(ws)=>{
    allSockets.push(ws); //for broadcasting

    console.log("User "+userCount++ +": connected!");
    ws.on("error", console.error);

    ws.on("message",(data)=>{
        console.log(data.toString());
        allSockets.forEach(socket=>socket.send(data.toString()));
    });
});