const multiplayerGameRoom = [];

// finds the game room from the multiplayerGameRoom list.
function findMultiplayerGameRoom({ socketToBeFound }) {

    for (let i = 0; i < multiplayerGameRoom.length; i++) {
        if (multiplayerGameRoom[i].P1 == socketToBeFound || multiplayerGameRoom[i].P2 == socketToBeFound) {
            return { "found": true, "object": multiplayerGameRoom[i] }
        }
        return { "found": false }
    }
}


export { findMultiplayerGameRoom, multiplayerGameRoom }
