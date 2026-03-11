import GameRoom from "../class/Game.js"
import { liveGames } from "../store/gameStore.js";

const waitingList = [];
function handleWebSocketConnections(socket) {
    if (waitingList.length === 0) {
        waitingList.push(socket);
        socket.send(JSON.stringify({ "waiting": true }))
    }
    else {
        const roomId = crypto.randomUUID();
        const player1 = socket;
        const player2 = waitingList.shift();
        console.log(player1)
        liveGames[roomId] = new GameRoom(player1, player2);
        liveGames[roomId].startGame(roomId);
    }
}
export { handleWebSocketConnections };