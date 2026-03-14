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
            const { newPosition, message } = updatePlayerPostion(diceResult, gameRoom.player1Position, 1);
            if (newPosition === 100) {
                gameRoom.updatePosition({ pos: newPosition, message: message, dice: diceResult })
                gameRoom.endGame(1)
                return;
            }
            else if (newPosition > 100) {
                gameRoom.notValidMove({ message: "Not a valid move", dice: diceResult })
                return;
            }
            gameRoom.updatePosition({ pos: newPosition, message: message, dice: diceResult })
            return;
        }
        else {
            const { newPosition, message } = updatePlayerPostion(diceResult, gameRoom.player2Position, 2);
            if (newPosition === 100) {
                gameRoom.updatePosition({ pos: newPosition, message: message, dice: diceResult })
                gameRoom.endGame(2)
                return;
            }
            else if (newPosition > 100) {
                gameRoom.notValidMove({ message: "Not a valid move", dice: diceResult })
                return;
            }
            gameRoom.updatePosition({ pos: newPosition, message: message, dice: diceResult })
            return;
        }
    }
    else {
        gameRoom.notValidPlayer(player);
    }
}
function updatePlayerPostion(diceResult, playerposition, player) {
    const pos = playerposition + diceResult;
    if (pos in ladders) {
        return { "newPosition": ladders[pos], "message": `Player ${player} moved from${playerposition} to ${pos} (ladder ${ladders[pos]})` };
    }
    else if (pos in snakes) {
        return { "newPosition": snakes[pos], "message": `Player ${player} moved from ${playerposition} to ${pos} (snake ${snakes[pos]})` };
    }
    return { "newPosition": pos, "message": `Player ${player} moved from ${playerposition} to ${pos}` };
}
function rollDice() {
    const randInt = Math.random() * (7 - 1) + 1;
    return Math.floor(randInt);
}

export { handleDiceRoll }