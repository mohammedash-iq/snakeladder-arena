import { WebSocketServer } from "ws";
import { handleMultiplayerSocketConnection, handleMultiplayerSocketDisconnection } from "./controllers/multiplayerWebsocketController.js";
import { handleSinglePlayerSocketConnection, handleSinglePlayerSocketDisconnection } from "./controllers/singlePlayerWebsocketController.js"
import { handleSinglePlayerTurn } from "./controllers/singlePlayerGameLogicController.js"
import { handlePlayerTurn } from "./controllers/multiplayerGameLogicController.js";


// For the Mutliplayer Game.
const websocket = new WebSocketServer({ port: 8800 });

websocket.on("connection", (socket) => {
    handleMultiplayerSocketConnection(socket);
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
        handleMultiplayerSocketDisconnection(socket);
    })
}
)

// weboscket for the sinle player game
const webSocket1 = new WebSocketServer({ port: 8900 })

webSocket1.on("connection", (socket) => {
    handleSinglePlayerSocketConnection({ "socket": socket });
    socket.on("message", (data) => {
        const parsedData = JSON.parse(data);
        if (parsedData.request === "DICE-ROLL") {
            handleSinglePlayerTurn({ playerSocketObject: socket })
        }
    })
    socket.on("close", () => {
        handleSinglePlayerSocketDisconnection({ "socket": socket })
    })
})


