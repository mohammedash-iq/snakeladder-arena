import { useSocket, useDice } from "../store/connectionStore"
function GameDetails() {
    const diceVal = useDice((state) => state.diceVal);
    function rollDice() {
        const socketObj = useSocket.getState()
        socketObj.socketConnection.send(JSON.stringify({ "type": "roll" }));
    }
    return (
        <>
            <div className=" p-2 bg-gray-100 rounded-lg">
                <button onClick={rollDice} className="bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 flex"> Roll Dice </button>
                <div className="text-gray-700">
                    <p className=" text-center mt-2">Dice Result</p>
                    <p className="text-2xl font-bold text-center text-gray-600">{diceVal}</p>
                </div>

            </div>
        </>

    )
}

export default GameDetails