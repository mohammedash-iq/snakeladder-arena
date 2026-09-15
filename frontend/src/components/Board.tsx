import { useGameData } from "../store/connectionStore";

function Board() {
  const gameData = useGameData();
  return (
    <div className="flex flex-1 min-h-[400px] items-center justify-center rounded-3xl border border-[#e8e4df] bg-white p-5 shadow-sm">
      {gameData.gameState === "won" ? (
        <WonGame />
      ) : gameData.gameState === "lost" ? (
        <LostGame />
      ) : (
        <>{createBoard({ p1: gameData.P1POS, p2: gameData.P2POS })}</>
      )}
    </div>
  );
}

function createBoard({ p1, p2 }: { p1: number; p2: number }) {
  const boardArr = [];

  for (let i: number = 0; i < 10; i = i + 2) {
    for (let j: number = (i + 1) * 10; j > i * 10; j--) {
      boardArr.push(<BoardCube pos={{ p1, p2 }} key={j} val={j} />);
    }

    for (let k: number = (i + 1) * 10 + 1; k <= (i + 2) * 10; k++) {
      boardArr.push(<BoardCube pos={{ p1, p2 }} key={k} val={k} />);
    }
  }

  return (
    <div className="board grid aspect-square w-full max-w-[650px] grid-cols-10 gap-1.5 rounded-2xl bg-[#eeeae5] p-1.5">
      {boardArr}
    </div>
  );
}

function BoardCube({ val, pos }: { val: number; pos: { p1: number; p2: number } }) {
  const snakes: Record<number, number> = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
  const ladders: Record<number, number> = { 2: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 99, 85: 97 };

  let content: string | number = val;
  let bg = "bg-[#f7f5f2]";

  if (val in ladders) { content = "🪜"; bg = "bg-[#e4f1e5]"; }
  if (val in snakes) { content = "🐍"; bg = "bg-[#f6e2e2]"; }
  if (val === 100) { content = "👑"; bg = "bg-[#f8edc9]"; }

  let indicatorbg = "";

  if (pos.p1 === val) { indicatorbg = "ring-2 ring-inset ring-[#e99a9a]"; }
  if (pos.p2 === val) { indicatorbg = "ring-2 ring-inset ring-[#91b7df]"; }
  if (pos.p1 === pos.p2 && pos.p1 === val) { indicatorbg = "ring-2 ring-inset ring-[#e99a9a] ring-offset-2 ring-offset-[#91b7df]"; }

  return (
    <div
      className={`${bg} ${indicatorbg} flex aspect-square items-center justify-center rounded-lg border border-[#e8e3de] text-xs font-semibold text-[#5f5b57] sm:text-sm`}>
      {content}
    </div>
  );
}

function WonGame() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 max-w-sm">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#f8edc9] border border-[#ebd89f] text-5xl shadow-sm animate-bounce">
        🏆
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-[#a89552]">
        Match Concluded
      </span>
      <h2 className="mt-1 text-3xl font-bold text-[#45413e]">Victory!</h2>
    </div>
  );
}

function LostGame() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 max-w-sm">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#f6e2e2] border border-[#ebd0d0] text-5xl shadow-sm">
        🐍
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-[#9e6969]">
        Match Concluded
      </span>
      <h2 className="mt-1 text-3xl font-bold text-[#45413e]">Game Over</h2>
    </div>
  );
}

export default Board;