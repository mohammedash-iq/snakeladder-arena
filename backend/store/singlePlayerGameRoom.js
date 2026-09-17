
const singlePlayerGameRoom = []


function findSinglePlayerGameRoom({ socketToBeFound }) {
    for (let i = 0; i < singlePlayerGameRoom.length; i++) {
        if (singlePlayerGameRoom[i].PLAYER == socketToBeFound) {
            return { "found": true, "object": singlePlayerGameRoom[i] }
        }
        return { "found": false }
    }
}

export { singlePlayerGameRoom, findSinglePlayerGameRoom }