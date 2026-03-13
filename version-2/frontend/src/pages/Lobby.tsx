
import { handleSocketRecieve } from "../services/handleWebSocket"
import { useNavigate } from "react-router-dom"

function Lobby() {
    const navigate=useNavigate();
    function handleStartGame() {
        handleSocketRecieve({navigateFunction:navigate})
    }
    return (
        <>
            <div>
                Welcome to Snake and Ladder</div>
            <button onClick={handleStartGame}>Start Game</button></>
    )
}
export default Lobby