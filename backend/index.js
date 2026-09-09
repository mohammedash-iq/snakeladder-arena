import { WebSocketServer } from "ws";
import { handleWebSocketConnections, handleWebSocketDisconnections } from "./controllers/webSocketController.js";
import { handlePlayerTurn } from "./controllers/gameLogicController.js";

const websocket = new WebSocketServer({ port: 8800 });

websocket.on("connection", (socket) => {
    handleWebSocketConnections(socket);
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());
        if (parsedData.request === "DICE-ROLL") {
            handlePlayerTurn({ playerSocketObject: socket })
        }
        else if (parsedData.request === "END-GAME") {
            handleWebSocketDisconnections(socket);
        }
        else {
            socket.send(JSON.stringify({ "type": "ERROR", payload: { "error": "Not a valid socket request!" } }))
        }
    })
    socket.on("close", () => {
        handleWebSocketDisconnections(socket);
    })
}
)