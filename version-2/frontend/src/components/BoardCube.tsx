function BoardCube({ val, cssId }) {
  const snakes: object = {
    16: 6, 47: 26, 49: 11, 56: 53, 62: 19,
    64: 60, 87: 24, 93: 73, 95: 75, 98: 78
  };

  const ladders: object = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84,
    36: 44, 51: 67, 71: 91, 80: 99, 85: 97
  };
  let component = <div className="board-cube" id={cssId ? cssId : ""} >{val}</div>;
  if (val in ladders) {
    component = <div className="board-cube" id={cssId ? cssId : ""}>🪜</div>;
  }
  if (val in snakes) {
    component = <div className="board-cube" id={cssId ? cssId : ""} >🐍</div>;
  }
  if (val === 100) {
    component = <div className="board-cube" id={cssId ? cssId : ""} >👑</div>;
  }
  return (
    <>
      {component}
    </>
  )
}

export default BoardCube