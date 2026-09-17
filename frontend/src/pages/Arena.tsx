import Board from "../components/Board";
import GameDetails from "../components/GameDetails"

function Arena() {
    return (
        <div className="min-h-screen bg-[#f8f7f4] p-6">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
                <Board></Board>
                <div className="w-full lg:w-72">
                    <GameDetails />
                </div>
            </div>
        </div>
    )
}

export default Arena

