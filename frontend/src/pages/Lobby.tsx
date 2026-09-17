
import { multiplayerGameService } from "../services/multiplayerGameService"
import { singlePlayerGameService } from "../services/singlePlayerGameService"
import { useNavigate } from "react-router-dom"

function Lobby() {
    const navigate = useNavigate();
    function handleMultiplayerGame() {
        multiplayerGameService({ navigateFunction: navigate })
    }
    function handleSingleplayerGame() {
        singlePlayerGameService({ navigateFunction: navigate })
    }
    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
            <h1 className="text-4xl font-bold text-gray-600">
                Snakes & Ladders
            </h1>

            <div>Multiplayer Game
                <p>play online with an opponnent</p>
                <button onClick={handleMultiplayerGame}>Start Multiplayer</button>
            </div>
            <div>Computer Game
                <p>play against the computer</p>
                <button onClick={handleSingleplayerGame}>Start Computer Game</button>
            </div>

        </div>
    )
}
export default Lobby