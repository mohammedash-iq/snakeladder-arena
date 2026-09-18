import { multiplayerGameService } from "../services/multiplayerGameService";
import { singlePlayerGameService } from "../services/singlePlayerGameService";
import { useNavigate } from "react-router-dom";

function Lobby() {
    const navigate = useNavigate();

    function handleMultiplayerGame() {
        multiplayerGameService({ navigateFunction: navigate });
    }

    function handleSingleplayerGame() {
        singlePlayerGameService({ navigateFunction: navigate });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-10">
                Snakes & Ladders
            </h1>

            <div className="w-full max-w-md space-y-5">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Multiplayer Game
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        play online with an opponent
                    </p>

                    <button
                        onClick={handleMultiplayerGame}
                        className="mt-5 w-full rounded-lg bg-red-500 px-4 py-3 font-medium text-white transition-colors hover:bg-red-600"
                    >
                        Start Multiplayer
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Computer Game
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        play against the computer
                    </p>

                    <button
                        onClick={handleSingleplayerGame}
                        className="mt-5 w-full rounded-lg bg-slate-800 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-900"
                    >
                        Start Computer Game
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Lobby;