import useSocket from "../store/connectionStore"
function handleSocketRecieve({ navigateFunction }) {
    const socketStore = useSocket.getState();
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
        else if (parsedData.type === "message") {
            console.log(parsedData.content)
        }
        else if (parsedData.type === "win") {
            alert('You won')
        }
        else if (parsedData.type === "start") {
            console.log(parsedData)
            navigateFunction("/arena")
        }
        else if (parsedData.type === "move") {
            console.log("control here")
            console.log(parsedData)
        }
    }
}
export { handleSocketRecieve }