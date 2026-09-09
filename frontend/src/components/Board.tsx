import { usePlayer } from "../store/connectionStore";
import { useSocket, useDice, useUpdates } from "../store/connectionStore";

function Board() {
  const player1Pos = usePlayer((state) => state.player1);
  const player2Pos = usePlayer((state) => state.player2);

  console.log(player1Pos, player2Pos);

  return (
    <div className="min-h-screen bg-[#f8f7f4] p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        {/* Board */}
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-[#e8e4df] bg-white p-5 shadow-sm">
          {createBoard({ p1: player1Pos, p2: player2Pos })}
        </div>

        {/* Game Details */}
        <div className="w-full lg:w-72">
          <GameDetails />
        </div>
      </div>
    </div>
  );
}

function createBoard({ p1, p2 }) {
  const boardArr = [];

  for (let i: number = 0; i < 10; i = i + 2) {
    for (let j: number = (i + 1) * 10; j > i * 10; j--) {
      boardArr.push(
        <BoardCube pos={{ p1, p2 }} key={j} val={j} />
      );
    }

    for (
      let k: number = (i + 1) * 10 + 1;
      k <= (i + 2) * 10;
      k++
    ) {
      boardArr.push(
        <BoardCube pos={{ p1, p2 }} key={k} val={k} />
      );
    }
  }

  return (
    <div className="board grid aspect-square w-full max-w-[650px] grid-cols-10 gap-1.5 rounded-2xl bg-[#eeeae5] p-1.5">
      {boardArr}
    </div>
  );
}

function BoardCube({ val, pos }) {
  const snakes: object = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78,
  };

  const ladders: object = {
    2: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 99,
    85: 97,
  };

  let content = val;
  let bg = "bg-[#f7f5f2]";

  if (val in ladders) {
    content = "🪜";
    bg = "bg-[#e4f1e5]";
  }

  if (val in snakes) {
    content = "🐍";
    bg = "bg-[#f6e2e2]";
  }

  if (val === 100) {
    content = "👑";
    bg = "bg-[#f8edc9]";
  }

  let indicatorbg = "";

  if (pos.p1 === val) {
    indicatorbg = "ring-2 ring-inset ring-[#e99a9a]";
  }

  if (pos.p2 === val) {
    indicatorbg = "ring-2 ring-inset ring-[#91b7df]";
  }

  if (pos.p1 === pos.p2 && pos.p1 === val) {
    indicatorbg = "ring-2 ring-inset ring-[#e99a9a] ring-offset-2 ring-offset-[#91b7df]";
  }

  return (
    <div
      className={`${bg} ${indicatorbg} flex aspect-square items-center justify-center rounded-lg border border-[#e8e3de] text-xs font-semibold text-[#5f5b57] sm:text-sm`}
    >
      {content}
    </div>
  );
}

function GameDetails() {
  const diceVal = useDice((state) => state.diceVal);
  const gameUpdates = useUpdates((state) => state.gameUpdates);

  function rollDice() {
    const socketObj = useSocket.getState();

    socketObj.socketConnection.send(
      JSON.stringify({ request: "DICE-ROLL" })
    );
  }
  function handleLeaveGame() {
    const socketObj = useSocket.getState();
    socketObj.socketConnection.send(
      JSON.stringify({ request: "END-GAME" })
    );
  }
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#e8e4df] bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9a9590]">
          Game
        </p>

        <h2 className="mt-1 text-xl font-semibold text-[#45413e]">
          Snakes & Ladders
        </h2>
      </div>

      <div className="rounded-2xl bg-[#f7f5f2] p-5">
        <p className="text-center text-sm font-medium text-[#918b85]">
          Dice Result
        </p>

        <p className="mt-2 text-center text-5xl font-semibold text-[#5c5752]">
          {diceVal}
        </p>
      </div>

      <button
        onClick={rollDice}
        className="w-full rounded-2xl bg-[#b9cce2] px-4 py-3 font-semibold text-[#3f4d5d] transition-colors hover:bg-[#abc1da] active:bg-[#9fb7d2]"
      >
        Roll Dice
      </button>

      {/* Game Updates */}
      <div className="rounded-2xl border border-[#eeeae5] bg-[#faf9f7] p-4">
        <div className="min-h-10 text-center text-sm font-medium leading-6 text-[#625d58]">
          {gameUpdates}
        </div>
        <div><button className="w-full rounded-2xl bg-red-400 px-2 py-1 font-semibold text-[#3f4d5d] transition-colors hover:bg-[#abc1da] active:bg-[#9fb7d2]" onClick={handleLeaveGame}>Leave Game</button></div>
      </div>
    </div>
  );
}

export default Board;