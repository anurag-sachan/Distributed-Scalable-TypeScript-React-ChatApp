import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080});
let userCount=1;

wss.on("connection",(ws)=>{

    console.log("User: "+userCount++);
    ws.on("error", console.error);

    ws.on("message",(data)=>{
        console.log("message received: "+data);
    });

    ws.send("message from server");
});