import { WebSocketServer } from "ws";
import { handleWebSocketConnections } from "./controllers/webSocketController.js";

const websocket = new WebSocketServer({ port: 8800 });

websocket.on("connection", (socket) => {
    handleWebSocketConnections(socket);
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());
        socket.send("json recieved")
        if (parsedData.roll) {
            socket.send("you pressed roll");
        }
    })
}
)