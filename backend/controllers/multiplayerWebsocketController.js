import { handleStartGame } from "./multiplayerGameLogicController.js"
import { findMultiplayerGameRoom } from "../store/multiplayerGameRoom.js"
import { multiplayerGameRoom } from "../store/multiplayerGameRoom.js";

const waitingList = [];
// handles socket connections for a new player and adds him to the waiting list or gives him a player to play with
function handleMultiplayerSocketConnection(socket) {
    if (waitingList.length === 0 || socket in waitingList) {
        waitingList.push(socket);
        socket.send(JSON.stringify({ "type": "WAITING", "payload": { "message": "waiting for other player to join!" } }))
    }
    else {
        const player1 = socket;
        const player2 = waitingList.shift();
        multiplayerGameRoom.push({ "P1": player1, "P2": player2, "P1POS": 1, "P2POS": 1, "TURN": "P1" })
        handleStartGame({ player1socket: player1, player2socket: player2 })
    }
}
//handles the socket connection close
function handleMultiplayerSocketDisconnection(socket) {
    //checks weather the player is already in the waiting list, if yes the player will be removed from the list.
    const waitingIndex = waitingList.indexOf(socket);
    if (waitingIndex !== -1) {
        waitingList.splice(waitingIndex, 1);
        return;
    }
    //checks the player in the gamerooms and gracefully realease the connection and lets the other player know the player has left.
    // the findMultiplayerGameRoom returns a object { found: boolena, object: the actual object}
    const gameroom = findMultiplayerGameRoom({ "socketToBeFound": socket });
    if (gameroom.found) {
        if (gameroom.object.P1 == socket) {
            gameroom.object.P2.send(JSON.stringify({ "type": "WON", "payload": { "message": "Player 1 left the match!, you won!" } }))
            return
        }
        gameroom.object.P1.send(JSON.stringify({ "type": "WON", "payload": { "message": "Player 1 left the match!, you won!" } }))
    }
}
export { handleMultiplayerSocketConnection, handleMultiplayerSocketDisconnection };