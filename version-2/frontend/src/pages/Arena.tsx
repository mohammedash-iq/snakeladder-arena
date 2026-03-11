import Board from "../components/Board"
import GameDetails from "../components/GameDetails"


function Arena() {
    return (
        <div className="game-container">
            <Board></Board>
            <div className="sidebar">
                <GameDetails></GameDetails>
            </div>
        </div>
    )
}

export default Arena