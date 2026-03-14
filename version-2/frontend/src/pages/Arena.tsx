import { useUpdates } from "../store/connectionStore"
import Board from "../components/Board"
import GameDetails from "../components/GameDetails"


function Arena() {
    const gameUpdates = useUpdates((state) => state.gameUpdates);
    return (
        <>
            <div className="game-container">
                <Board ></Board>
                <div >
                    <GameDetails></GameDetails>
                </div>
            </div>
            <div className="game-updates">{gameUpdates}</div>
        </>
    )
}

export default Arena