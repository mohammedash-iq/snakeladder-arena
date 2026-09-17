import { singlePlayerGameRoom, findSinglePlayerGameRoom } from "../store/singlePlayerGameRoom.js"

function handleSinglePlayerSocketConnection({ socket }) {
    singlePlayerGameRoom.push({ "PLAYER": socket, "TURN": "PLAYER", "PLAYERPOS": 1, "COMPUTERPOS": 1 })
    socket.send(JSON.stringify({ "type": "SINGLE-PLAYER-GAME-STARTED", "payload": { "message": "Game Started, your move!", "player": "P1", "TURN": true, "PLAYERPOS": 1, "COMPUTERPOS": 1 } }))
    return;
}


function handleSinglePlayerSocketDisconnection({ socket }) {
    const gameroom = findSinglePlayerGameRoom({ "socketToBeFound": socket });
    if (gameroom.found) {
        const index = singlePlayerGameRoom.indexOf(gameroom);
        singlePlayerGameRoom.splice(index, 1);
    }
}


export { handleSinglePlayerSocketConnection, handleSinglePlayerSocketDisconnection }