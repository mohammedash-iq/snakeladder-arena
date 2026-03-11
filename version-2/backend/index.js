import { WebSocketServer } from "ws";
import { handleWebSocketConnections } from "./controllers/webSocketController.js";
import { handleDiceRoll } from "./controllers/gameLogicController.js";

const websocket = new WebSocketServer({ port: 8800 });

websocket.on("connection", (socket) => {
    handleWebSocketConnections(socket);
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());
        
        if (parsedData.type==="roll") {
            //socket.player is created when the connection is established and handle webSocketconnections is called.
            handleDiceRoll(parsedData, socket.player)
        }
    })
}
)