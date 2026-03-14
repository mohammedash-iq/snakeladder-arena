import { useSocket, useDice } from "../store/connectionStore"
function GameDetails() {
    const diceVal = useDice((state) => state.diceVal);
    function rollDice() {
        const socketObj = useSocket.getState()
        socketObj.socketConnection.send(JSON.stringify({ "type": "roll" }));
    }
    return (
        <>
            <button id="dice-btn" onClick={rollDice}> Roll Dice</button>
            <p>Turn :You</p>
            <p>Dice result: {diceVal}</p>
        </>

    )
}

export default GameDetails