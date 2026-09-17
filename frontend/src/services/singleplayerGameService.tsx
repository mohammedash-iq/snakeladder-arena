import { useSocket, useGameData } from "../store/connectionStore"
function singlePlayerGameService({ navigateFunction }) {
    const socketStore = useSocket.getState();
    const gameData = useGameData.getState();
    const socket = new WebSocket("ws://localhost:8900");
    socket.onopen = () => {
        socketStore.updateSocketConnection(socket)
        socketStore.updateConnectionState("connected")
        console.log("You are connected to ws server");
    }
    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        if (parsedData.type === "INVALID-MOVE") {
            gameData.updateGameUpdates(parsedData.message);
            gameData.updateDiceVal(parsedData.dice)
            return;
        }
        else if (parsedData.type === "WON") {
            gameData.updateGameUpdates(parsedData.payload.message)
            gameData.updateGameState("won")
            return;
        }
        else if (parsedData.type === "LOST") {
            gameData.updateGameUpdates(parsedData.payload.message)
            gameData.updateGameState("lost")
            return;
        }
        else if (parsedData.type === "SINGLE-PLAYER-GAME-STARTED") {
            gameData.updateSinglePlayerMode({ SINGLEPLAYER: true })
            gameData.updatePlayer({ player: parsedData.payload.player, TURN: parsedData.payload.TURN, gameUpdates: parsedData.message, P1POS: 1, P2POS: 1 })
            gameData.updateGameUpdates(parsedData.payload.message);
            navigateFunction("/arena")
            return;
        }
        else if (parsedData.type === "MOVE") {
            gameData.updatePlayer({ P1POS: parsedData.payload.P1POS, P2POS: parsedData.payload.P2POS, DICE: parsedData.payload.DICE, TURN: parsedData.payload.TURN });
            gameData.updateGameUpdates(parsedData.payload.message);
            gameData.updateDiceVal(parsedData.payload.dice);
            return;
        }
    }
}
export { singlePlayerGameService }