import BoardCube from "./BoardCube"
function Board() {
  return (
    <div className="game-container">
      {createBoard()}
    </div>
  )
}

export default Board

function createBoard() {
  const boardArr = []
  for (let i: number = 0; i < 10; i = i + 2) {
    for (let j: number = (i + 1) * 10; j > i * 10; j--) {
      boardArr.push(<BoardCube key={j} val={j}></BoardCube>)
    }
    for (let k: number = ((i + 1) * 10) + 1; k <= (i + 2) * 10; k++) {
      boardArr.push(<BoardCube key={k} val={k}></BoardCube>)
    }
  }
  return <div className="board">{boardArr}</div>
}




