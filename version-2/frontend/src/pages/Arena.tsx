import { usePlayer } from "../store/connectionStore"
import Board from "../components/Board"
import GameDetails from "../components/GameDetails"


function Arena() {
    return (
        <div className="game-container">
            <Board ></Board>
            <div >
                <GameDetails></GameDetails>
            </div>
        </div>
    )
}

export default Arena