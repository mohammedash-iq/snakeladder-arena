import useSocket from "../store/connectionStore"
function GameDetails() {
    function rollDice() {
        const socketObj = useSocket.getState()
        socketObj.socketConnection.send(JSON.stringify({ "type": "roll" }))
        console.log("sent roll ws request")
    }
    return (
        <>
            <button id="dice-btn" onClick={rollDice}> Roll Dice</button>
            <p>Turn :You</p>
            <p>Dice result: <span id="dice-result"></span></p>
        </>

    )
}

export default GameDetails