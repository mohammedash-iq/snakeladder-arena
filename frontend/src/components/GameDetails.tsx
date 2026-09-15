import { useGameData, useSocket } from "../store/connectionStore"

function GameDetails() {
    const dice = useGameData((state) => state.DICE);
    const player = useGameData((state) => state.player);
    const turn = useGameData((state) => state.TURN);
    const updates = useGameData((state) => state.gameUpdates)
    function rollDice() {
        const socketObj = useSocket.getState();
        socketObj.socketConnection.send(JSON.stringify({ request: "DICE-ROLL" }));
    }
    function handleLeaveGame() {
        const socketObj = useSocket.getState();
        socketObj.socketConnection.send(JSON.stringify({ request: "END-GAME" }));
    }
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-[#e8e4df] bg-white p-5 shadow-sm">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9590]">
                    Game
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#45413e]">
                    Snakes & Ladders
                </h2>
            </div>

            <div>
                <div>{player ? "player1" : "player2"}</div>
                <div>{turn ? "your Turn" : "Other Player"}</div>
            </div>
            <div className="rounded-2xl bg-[#f7f5f2] p-5">
                <p className="text-center text-sm font-medium text-[#918b85]">
                    Dice Result
                </p>

                <p className="mt-2 text-center text-5xl font-semibold text-[#5c5752]">
                    {dice}
                </p>
            </div>

            <button
                onClick={rollDice}
                className="w-full rounded-2xl bg-[#b9cce2] px-4 py-3 font-semibold text-[#3f4d5d] transition-colors hover:bg-[#abc1da] active:bg-[#9fb7d2]"
            >
                Roll Dice
            </button>

            {/* Game Updates */}
            <div className="rounded-2xl border border-[#eeeae5] bg-[#faf9f7] p-4">
                <div className="min-h-10 text-center text-sm font-medium leading-6 text-[#625d58]">
                    {updates}
                </div>
                <div><button className="w-full rounded-2xl bg-red-400 px-2 py-1 font-semibold text-[#3f4d5d]  hover:bg-[#abc1da] " onClick={handleLeaveGame}>Leave Game</button></div>
            </div>
        </div>
    );
}

export default GameDetails;