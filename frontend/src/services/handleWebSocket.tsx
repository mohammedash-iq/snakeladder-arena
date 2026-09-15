import { useSocket, useGameData } from "../store/connectionStore"
function handleSocketRecieve({ navigateFunction }) {
    const socketStore = useSocket.getState();
    const gameData = useGameData.getState();
    const socket = new WebSocket("ws://localhost:8800");
    socketStore.updateSocketConnection(socket)
    socket.onopen = () => {
        socketStore.updateConnectionState("connected")
        console.log("You are connected to ws server");
    }
    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        if (parsedData.type === "WAITING") {
            console.log(parsedData)
            navigateFunction("/waiting");
        }
        else if (parsedData.type === "INVALID-MOVE") {
            gameData.updateGameUpdates(parsedData.message);
            gameData.updateDiceVal(parsedData.dice)
        }
        else if (parsedData.type === "WON") {
            alert('You won')
        }
        else if (parsedData.type === "LOST") {
            alert("you lose")
        }
        else if (parsedData.type === "GAME-STARTED") {
            navigateFunction("/arena")
        }
        else if (parsedData.type === "MOVE") {
            gameData.updatePlayer({ P1POS: parsedData.payload.P1POS, P2POS: parsedData.payload.P2POS, player: parsedData.payload.player, TURN: parsedData.payload.TURN })
            gameData.updateGameUpdates(parsedData.payload.message)
            gameData.updateDiceVal(parsedData.payload.dice);
        }
    }
}
export { handleSocketRecieve }