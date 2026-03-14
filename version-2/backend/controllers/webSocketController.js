import GameRoom from "../class/Game.js"
import { liveGames } from "../store/gameStore.js";

const waitingList = [];
function handleWebSocketConnections(socket) {
    if (waitingList.length === 0 || socket in waitingList) {
        waitingList.push(socket);
        socket.send(JSON.stringify({ "type": "waiting" }))
    }
    else {
        const roomId = crypto.randomUUID();
        const player1 = socket;
        const player2 = waitingList.shift();
        liveGames[roomId] = new GameRoom(player1, player2);
        liveGames[roomId].startGame(roomId);
    }
}
function handleWebSocketDisconnections(socket) {
    if (waitingList.find((ele) => ele == socket)) {
        waitingList.pop(socket);
    }
    else if (socket.gameData.roomId in liveGames) {
        liveGames[socket.gameData.roomId].handleLostConnection({ leftPlayer: socket.gameData.player, content: "the other player left! you win" });
        liveGames.pop(socket.gameData.roomId);
    }
}
export { handleWebSocketConnections, handleWebSocketDisconnections };