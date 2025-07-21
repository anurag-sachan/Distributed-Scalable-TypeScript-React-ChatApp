import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "redis";

const pub = createClient();
const sub = createClient();

pub.connect();
sub.connect();

const wss = new WebSocketServer({port:8082});
let userCount=1;
let allSockets: WebSocket[] = [];

sub.subscribe("chat", async(message)=>{
    await allSockets.forEach(socket=>socket.send(message.toString()));
})

wss.on("connection",(ws)=>{
    allSockets.push(ws); //for broadcasting

    console.log("User "+userCount++ +": connected!");
    ws.on("error", console.error);

    ws.on("message",(data)=>{
        console.log(data.toString());
        pub.publish("chat", data.toString()); //publish to pub-sub
    });
});