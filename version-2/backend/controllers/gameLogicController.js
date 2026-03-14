import { liveGames } from "../store/gameStore.js";
const snakes = {
    16: 6, 47: 26, 49: 11, 56: 53, 62: 19,
    64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};

const ladders = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84,
    36: 44, 51: 67, 71: 91, 80: 99, 85: 97
};

function handleDiceRoll(gameData) {
    const player = gameData.player;
    const gameRoom = liveGames[gameData.roomId];
    const diceResult = rollDice();
    if (gameRoom.currentPlayer === player) {
        if (player === 1) {
            const { newPosition, message } = updatePlayerPostion(diceResult, gameRoom.player1Position, player);
            if (newPosition === 100) {
                gameRoom.updatePosition({ pos: newPosition, message: message })
                gameRoom.endGame(1)
                return;
            }
            else if (newPosition > 100) {
                gameRoom.notValidMove("Not a valid move!")
                return;
            }
            gameRoom.updatePosition({ newPosition, message })
            return;
        }
        else {
            const newPosition = updatePlayerPostion(diceResult, gameRoom.player2Position)
            if (newPosition === 100) {
                gameRoom.updatePosition(newPosition)
                gameRoom.endGame(2)
            }
            else if (newPosition > 100) {
                gameRoom.notValidMove("Not a valid move!")
            }
            gameRoom.updatePosition(newPosition)
            return;
        }

    }
    else {
        gameRoom.notValidPlayer(gameData.player)
    }
}
function updatePlayerPostion(diceResult, playerposition, player) {
    const pos = playerposition + diceResult;
    if (pos in ladders) {
        return { "newPosition": ladders[pos], "message": `Player ${player} ->${playerposition} to ${newPosition} snake -> ${ladders[pos]}` };
    }
    else if (pos in snakes) {
        return { "newPosition": snakes[pos], "message": `Player ${player} ->${playerposition} to ${newPosition} snake -> ${snakes[pos]}` };
    }
    return { "newPosition": pos, "message": `Player ${player} moved from ${playerposition} to ${newPosition}` };
}
function rollDice() {
    const randInt = Math.random() * (7 - 1) + 1;
    return Math.floor(randInt);
}

export { handleDiceRoll }