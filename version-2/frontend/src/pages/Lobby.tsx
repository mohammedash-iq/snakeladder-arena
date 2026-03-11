import { Link } from "react-router-dom"
function Lobby() {
    function handleStartGame(e) {
        //if the ws server returns waiting just show a laoding screen saying "waiting for player"
        //else start the game
        alert("starting Game")
    }
    return (
        <>
            <div>
                Welcome to Snake and Ladder</div>
            <Link to="/arena" onClick={handleStartGame}>Start Game</Link></>
    )
}
export default Lobby