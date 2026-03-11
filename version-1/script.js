const board = document.getElementById('board');
const currentPlayerName = document.getElementById("current-player-name")
const diceBtn = document.getElementById("dice-btn")
const diceResult = document.getElementById("dice-result")
const resetBtn = document.getElementById("reset-btn")

//code for loading the board
const snakes = {
    16: 6, 47: 26, 49: 11, 56: 53, 62: 19,
    64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};

const ladders = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84,
    36: 44, 51: 67, 71: 91, 80: 99, 85: 97
};

for (let i = 0; i < 10; i = i + 2) {
    for (let j = (i + 1) * 10; j > i * 10; j--) {
        const cell = createDiv(j);
        board.appendChild(cell);
    }
    for (let k = ((i + 1) * 10) + 1; k <= (i + 2) * 10; k++) {
        const cell = createDiv(k);
        board.appendChild(cell);
    }
}
function createDiv(value) {
    const div = document.createElement('div');
    if (value in snakes) {
        div.textContent = "🐍";
        div.setAttribute("id", `box${value}`);
    }
    else if (value in ladders) {
        div.textContent = "🪜";
        div.setAttribute("id", `box${value}`);
    }
    else if (value === 100) {
        div.textContent = "👑";
        div.setAttribute("id", `box${value}`);
    }
    else {
        div.textContent = value;
        div.setAttribute("id", `box${value}`);
    }
    return div;
}

//code for managing the players
let currentPlayer = "P1";
let player1Position = 1;
let player2Position = 1;


diceBtn.addEventListener("click", () => {
    const diceNum = rollDice();
    diceResult.innerText = diceNum;
    if (currentPlayer === "P1") {
        if ((player1Position + diceNum) in snakes) {
            const snakeEnd = snakes[player1Position + diceNum];
            console.log(`that was a snake form ${player1Position + diceNum} to ${snakeEnd} by P1`)
            changePlayerPostion("P1", player1Position, snakeEnd);
        }
        else if ((player1Position + diceNum) in ladders) {
            const ladderEnd = ladders[player1Position + diceNum];
            console.log(`that was a ladder form ${player1Position + diceNum} to ${ladderEnd} by P1`)
            changePlayerPostion("P1", player1Position, ladderEnd);
        }
        else if ((player1Position + diceNum) === 100) {
            alert("Player 2 won!")
            changePlayerPostion("P1", player1Position, player1Position + diceNum);
            resetGame()
        }
        else {
            if ((player1Position + diceNum) < 100) {
                console.log(`that was a movemnt form ${player1Position} to ${player1Position + diceNum} by P1`)
                changePlayerPostion("P1", player1Position, player1Position + diceNum);
            }
            else {
                console.log("not a valid move")
            }
        }
        currentPlayer = "P2";
        currentPlayerName.textContent = "Player 2";
    }
    else {
        if ((player2Position + diceNum) in snakes) {
            const snakeEnd = snakes[player2Position + diceNum]
            console.log(`that was a snake form ${player2Position + diceNum} to ${snakeEnd} by P2`)
            changePlayerPostion("P2", player2Position, snakeEnd);
        }
        else if ((player2Position + diceNum) in ladders) {
            const ladderEnd = ladders[player2Position + diceNum];
            console.log(`that was a ladder form ${player2Position + diceNum} to ${ladderEnd} by P2`)
            changePlayerPostion("P2", player2Position, ladderEnd);
        }
        else if ((player2Position + diceNum) === 100) {
            alert("Player 1 won!")
            changePlayerPostion("P2", player2Position, ladderEnd);
            resetGame()
        }
        else {
            if ((player2Position + diceNum) < 100) {
                console.log(`that was a movemnt form ${player2Position} to ${player2Position + diceNum} by P2`)
                changePlayerPostion("P2", player2Position, player2Position + diceNum);
            }
            else {
                console.log("not a valid move");
            }
        }
        currentPlayer = "P1";
        currentPlayerName.innerHTML = "Player 1";
    }

})
function rollDice() {
    const randInt = Math.random() * (7 - 1) + 1;
    return Math.floor(randInt);
}

function changePlayerPostion(player, oldPosition, newposition) {
    if (player === "P1") {
        player1Position = newposition;
        const prevPos = document.getElementById(`box${oldPosition}`);
        prevPos.classList.remove("player-1-position-indicator");
        const newPos = document.getElementById(`box${newposition}`)
        newPos.classList.add("player-1-position-indicator");

    }
    else {
        player2Position = newposition;
        const prevPos = document.getElementById(`box${oldPosition}`)
        prevPos.classList.remove("player-2-position-indicator");
        const newPos = document.getElementById(`box${newposition}`)
        newPos.classList.add("player-2-position-indicator");

    }

}
function resetGame() {
    player1Position = 1;
    player2Position = 2;
    alert("Game is being reset!")
}

resetBtn.addEventListener("click", resetGame)