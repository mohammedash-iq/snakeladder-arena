import { useSocket, useGameData } from "../store/connectionStore"
function handleSocketRecieve({ navigateFunction }) {
    const socketStore = useSocket.getState();
    const gameData = useGameData.getState();
    const socket = new WebSocket("ws://localhost:8800");
    socket.onopen = () => {
        socketStore.updateSocketConnection(socket)
        socketStore.updateConnectionState("connected")
        console.log("You are connected to ws server");
    }
    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        if (parsedData.type === "WAITING") {
            navigateFunction("/waiting");
            return;
        }
        else if (parsedData.type === "INVALID-MOVE") {
            gameData.updateGameUpdates(parsedData.message);
            gameData.updateDiceVal(parsedData.dice)
            return;
        }
        else if (parsedData.type === "WON") {
            gameData.updateGameState("won")
            return;
        }
        else if (parsedData.type === "LOST") {
            gameData.updateGameState("lost")
            return;
        }
        else if (parsedData.type === "GAME-STARTED") {
            gameData.updatePlayer({ player: parsedData.payload.player, TURN: parsedData.payload.TURN, gameUpdates: parsedData.message })
            navigateFunction("/arena")
            return;
        }
        else if (parsedData.type === "MOVE") {
            gameData.updatePlayer({ P1POS: parsedData.payload.P1POS, P2POS: parsedData.payload.P2POS, DICE: parsedData.DICE, TURN: parsedData.payload.TURN })
            gameData.updateGameUpdates(parsedData.payload.message)
            gameData.updateDiceVal(parsedData.payload.dice);
            return;
        }
    }
}
export { handleSocketRecieve }