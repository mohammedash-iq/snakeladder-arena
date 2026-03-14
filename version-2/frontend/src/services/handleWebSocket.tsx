import { useSocket, usePlayer, useUpdates, useDice } from "../store/connectionStore"
function handleSocketRecieve({ navigateFunction }) {
    const socketStore = useSocket.getState();
    const playerData = usePlayer.getState();
    const gameUpdates = useUpdates.getState();
    const diceVal = useDice.getState();
    const socket = new WebSocket("ws://localhost:8800");
    socketStore.updateSocketConnection(socket)
    socket.onopen = () => {
        socketStore.updateConnectionState("connected")
        console.log("You are connected to ws server");
    }
    socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data)
        if (parsedData.type === "waiting") {
            console.log(parsedData)
            navigateFunction("/waiting");
        }
        else if (parsedData.type === "invalid-player") {
            alert(parsedData.message)
        }
        else if (parsedData.type === "invalid-move") {
            gameUpdates.updateGameUpdates(parsedData.message);
            diceVal.updateDiceVal(parsedData.dice)
        }
        else if (parsedData.type === "win") {
            alert('You won')
        }
        else if (parsedData.type === "lose") {
            alert("you lose")
        }
        else if (parsedData.type === "start") {
            console.log(parsedData)
            navigateFunction("/arena")
        }
        else if (parsedData.type === "move") {
            playerData.updatePlayer({ player1: parsedData.player1Position, player2: parsedData.player2Position })
            gameUpdates.updateGameUpdates(parsedData.message)
            diceVal.updateDiceVal(parsedData.dice);
        }
    }
}
export { handleSocketRecieve }