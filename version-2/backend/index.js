import { WebSocketServer } from "ws";
import { handleWebSocketConnections, handleWebSocketDisconnections } from "./controllers/webSocketController.js";
import { handleDiceRoll } from "./controllers/gameLogicController.js";

const websocket = new WebSocketServer({ port: 8800 });

websocket.on("connection", (socket) => {
    handleWebSocketConnections(socket);
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());
        if (parsedData.type === "roll") {
            handleDiceRoll(parsedData, socket.gameData)
        }
    })
    socket.on("close", () => {
        handleWebSocketDisconnections(socket);

    })
}
)