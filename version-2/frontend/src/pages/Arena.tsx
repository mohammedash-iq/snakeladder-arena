import { useUpdates } from "../store/connectionStore"
import Board from "../components/Board"
import GameDetails from "../components/GameDetails"


function Arena() {
    const gameUpdates = useUpdates((state) => state.gameUpdates);
    return (
        <>
            <div className="flex gap-6 justify-center items-center">
                <div className="mt-4">
                    <Board></Board>
                </div >
                <div >
                    <GameDetails></GameDetails>
                </div>
            </div >
            <div className="text-md font-bold text-gray-800 text-center m-4">{gameUpdates}</div>
        </>
    )
}

export default Arena