import { useNavigate } from "react-router-dom";
import { useGameData, useSocket } from "../store/connectionStore"

function GameDetails() {
    const navigate = useNavigate()
    const gameData = useGameData()
    function rollDice() {
        const socketObj = useSocket.getState();
        socketObj.socketConnection.send(JSON.stringify({ request: "DICE-ROLL" }));
    }
    function handleLeaveGame() {
        const response = confirm("Do you want to leave the game?")
        if (response) {
            const socketObj = useSocket.getState();
            gameData.resetGameData();
            socketObj.updateConnectionState("disconnected");
            socketObj.socketConnection.close();
            navigate("/");
            return;
        }
        return;
    }
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-[#e8e4df] bg-white p-5 shadow-sm">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9590]">Game</p>
                <h2 className="mt-1 text-xl font-semibold text-[#45413e]">Snakes & Ladders</h2>
            </div>

            <div>
                <div>{gameData.player === 1 ? "Player1" : "Player2"}</div>
                <div>{gameData.TURN ? "your Turn" : "Other Player"}</div>
            </div>
            <div className="rounded-2xl bg-[#f7f5f2] p-5">
                <p className="text-center text-sm font-medium text-[#918b85]"> Dice Result</p>
                <p className="mt-2 text-center text-5xl font-semibold text-[#5c5752]">{gameData.DICE} </p>
            </div>

            {gameData.TURN ? <button
                onClick={rollDice}
                className="w-full rounded-2xl   bg-[#b9cce2] px-4 py-3 font-semibold text-[#3f4d5d] transition-colors hover:bg-[#abc1da] active:bg-[#9fb7d2]">
                Roll Dice
            </button> : <div className="w-full rounded-2xl   bg-[#b9cce2] px-4 py-3 font-semibold text-[#3f4d5d] text-center">....</div>}


            {/* Game Updates */}
            <div className="rounded-2xl border border-[#eeeae5] bg-[#faf9f7] p-4">
                <div className="min-h-10 text-center text-sm font-medium leading-6 text-[#625d58]">
                    {gameData.gameUpdates}
                </div>
                <div><button className="w-full rounded-2xl bg-red-400 px-2 py-1 font-semibold text-[#3f4d5d]  hover:bg-[#abc1da] " onClick={handleLeaveGame}>Leave Game</button></div>
            </div>
        </div >
    );
}

export default GameDetails;