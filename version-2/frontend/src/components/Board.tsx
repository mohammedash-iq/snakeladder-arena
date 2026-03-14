import BoardCube from "./BoardCube"
import { usePlayer } from "../store/connectionStore"
function Board() {
  const player1Pos = usePlayer((state) => state.player1);
  const player2Pos = usePlayer((state) => state.player2)
  console.log(player1Pos, player2Pos)
  return (
    <div className="game-container">
      {createBoard({ p1: player1Pos, p2: player2Pos })}
    </div>
  )
}
export default Board

function createBoard({ p1, p2 }) {
  const boardArr = []
  for (let i: number = 0; i < 10; i = i + 2) {
    for (let j: number = (i + 1) * 10; j > i * 10; j--) {
      boardArr.push(<BoardCube pos={{ p1, p2 }} key={j} val={j}></BoardCube>)
    }
    for (let k: number = ((i + 1) * 10) + 1; k <= (i + 2) * 10; k++) {
      boardArr.push(<BoardCube pos={{ p1, p2 }} key={k} val={k}></BoardCube>)
    }
  }
  return <div className="board">{boardArr}</div>
}




