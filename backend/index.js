import { WebSocketServer } from "ws";
import { handleWebSocketConnections, handleWebSocketDisconnections } from "./controllers/multiplayerWebsocketController.js";
import { handlePlayerTurn } from "./controllers/multiplayerGameLogicController.js";


// For the Mutliplayer Game.
const websocket = new WebSocketServer({ port: 8800 });

websocket.on("connection", (socket) => {
    handleWebSocketConnections(socket);
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data.toString());
        if (parsedData.request === "DICE-ROLL") {
            handlePlayerTurn({ playerSocketObject: socket })
        }
        else {
            socket.send(JSON.stringify({ "type": "ERROR", "payload": { "error": "Not a valid socket request!" } }))
        }
    })
    socket.on("close", () => {
        handleWebSocketDisconnections(socket);
    })
}
)



