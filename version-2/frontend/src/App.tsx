import Board from "./components/Board"
import GameDetails from "./components/GameDetails"

function App() {

    return (
        <div className="game-container">
            <Board></Board>
            <div className="sidebar">
                <GameDetails></GameDetails>
            </div>
        </div>
    )
}

export default App
