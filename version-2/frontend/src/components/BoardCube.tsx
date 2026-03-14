function BoardCube({ val, pos }) {
  const snakes: object = {
    16: 6, 47: 26, 49: 11, 56: 53, 62: 19,
    64: 60, 87: 24, 93: 73, 95: 75, 98: 78
  };

  const ladders: object = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84,
    36: 44, 51: 67, 71: 91, 80: 99, 85: 97
  };
  let content = val;
  let bg = "bg-slate-100"
  if (val in ladders) { content = "🪜"; bg = "bg-green-200" };
  if (val in snakes) { content = "🐍"; bg = "bg-red-200" };
  if (val === 100) { content = "👑"; bg = "bg-yellow-300" };

  let indicatorbg = null;
  if (pos.p1 === val) { indicatorbg = "bg-gradient-to-b from-red-500 to-transparent"; }
  if (pos.p2 === val) { indicatorbg = "bg-gradient-to-b from-blue-500 to-transparent"; }
  if (pos.p1 === pos.p2 && pos.p1 === val) { indicatorbg = "bg-gradient-to-t from-blue-500 via-red-500 to-transparent"; }

  return (
    <>
      <div className={`${bg} text-gray-800 rounded-sm flex items-center justify-center font-bold text-sm ${indicatorbg}`}>{content}</div>
    </>
  )
}

export default BoardCube