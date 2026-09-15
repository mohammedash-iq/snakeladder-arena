import { handleStartGame } from "../controllers/gameLogicController.js"
import { findLiveGames } from "../services/gameroomServices.js"
import { liveGames } from "../store/gameStore.js";

const waitingList = [];
// handles socket connections for a new player and adds him to the waiting list or gives him a player to play with
function handleWebSocketConnections(socket) {
    if (waitingList.length === 0 || socket in waitingList) {
        waitingList.push(socket);
        socket.send(JSON.stringify({ "type": "WAITING", "payload": { "message": "waiting for other player to join!" } }))
    }
    else {
        const player1 = socket;
        const player2 = waitingList.shift();
        liveGames.push({ "P1": player1, "P2": player2, "P1POS": 1, "P2POS": 1, "TURN": "P1" })
        handleStartGame({ player1socket: player1, player2socket: player2 })
    }
}
//handles the socket connection close
function handleWebSocketDisconnections(socket) {
    //checks weather the player is already in the waiting list, if yes the player will be removed from the list.
    if (waitingList.find((ele) => ele == socket)) {
        waitingList.pop(socket);
        return;
    }
    //checks the player in the gamerooms and gracefully realease the connection and lets the other player know the player has left.
    // the findLiveGames returns a object { found: boolena, object: the actual object}
    const gameroom = findLiveGames({ "socketToBeFound": socket });
    console.log(gameroom.object.P1.readyState)
    console.log(gameroom.object.P2.readyState)
    if (gameroom.found) {
        if (gameroom.object.P1 == socket) {
            gameroom.object.P2.send(JSON.stringify({ "type": "WON" }))
            return
        }
        gameroom.object.P1.send(JSON.stringify({ "type": "WON" }))
    }
}
export { handleWebSocketConnections, handleWebSocketDisconnections };