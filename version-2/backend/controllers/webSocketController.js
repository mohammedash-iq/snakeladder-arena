const waitingList = []
const games = {};
function handleWebSocketConnections(socket) {
    if (waitingList.length === 0) {
        waitingList.push(socket);
        socket.send("Waiting for other player")
    }
    else {
        const id = crypto.randomUUID();
        const p1 = socket;
        const p2 = waitingList.shift();
        games[id] = { "player1": p1, "palyer2": p2 };
        // we send the room id and other details to the user
        p1.send("you are ready to play");
        p2.send("you are ready to paly");
    }
}


export { handleWebSocketConnections };