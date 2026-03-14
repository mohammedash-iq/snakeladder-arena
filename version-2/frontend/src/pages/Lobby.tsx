
import { handleSocketRecieve } from "../services/handleWebSocket"
import { useNavigate } from "react-router-dom"

function Lobby() {
    const navigate = useNavigate();
    function handleStartGame() {
        handleSocketRecieve({ navigateFunction: navigate })
    }
    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">


            <h1 className="text-4xl font-bold text-gray-600">
                Snakes & Ladders
            </h1>

            <button
                onClick={handleStartGame}
                className="bg-blue-500 mt-5 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
                🎮 Start Game
            </button>


        </div>
    )
}
export default Lobby