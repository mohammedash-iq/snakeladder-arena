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
            const newPosition = updatePlayerPostion(diceResult, gameRoom.player1Position);
            if (newPosition === 100) {
                gameRoom.endGame(1)
                return;
            }
            else if (newPosition > 100) {
                gameRoom.notValidMove("Not a valid move!")
                return;
            }
            gameRoom.updatePosition(newPosition)
            return;
        }
        else {
            const newPosition = updatePlayerPostion(diceResult, gameRoom.player2Position)
            if (newPosition === 100) {
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
function updatePlayerPostion(diceResult, playerposition) {
    const newPosition = playerposition + diceResult;
    if (newPosition in ladders) {
        return ladders[newPosition];
    }
    else if (newPosition in snakes) {
        return snakes[newPosition];
    }
    return newPosition;
}
function rollDice() {
    const randInt = Math.random() * (7 - 1) + 1;
    return Math.floor(randInt);
}

export { handleDiceRoll }