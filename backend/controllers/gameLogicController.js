import { findLiveGames } from "../services/gameroomServices.js"


const snakes = {
    16: 6, 47: 26, 49: 11, 56: 53, 62: 19,
    64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};

const ladders = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84,
    36: 44, 51: 67, 71: 91, 80: 99, 85: 97
};

function handleStartGame({ socket1, socket2 }) {
    socket1.send(JSON.stringify({ "type": "GAME-STARTED", "payload": { "message": "Game has started!" } }));
    socket2.send(JSON.stringify({ "type": "GAME-STARTED", "payload": { "message": "Game has started!" } }));
}

function handlePlayerTurn({ playerSocketObject }) {
    const result = findLiveGames({ "socketToBeFound": playerSocketObject })
    if (result.found) {
        // condition below checks weather  its the palyer's turn to make the move and if yes handles the move.
        if (result.object.TURN === "P1" && result.object.P1 == playerSocketObject) {
            handleDiceRoll({ gameroom: result.object, currentPlayer: "P1" });
            return;
        } else if (result.object.TURN === "P2" && result.object.P2 == playerSocketObject) {
            handleDiceRoll({ gameroom: result.object, currentPlayer: "P2" });
            return;
        }
        else {
            handleNotValidMove({ "socket": playerSocketObject, message: "it's not your move!" })
            return;
        }
    }
    else {
        playerSocketObject.send(JSON.stringify({ "type": "ERROR", "payload": { "error": "Invalid request made!" } }))
    }
}

function handleDiceRoll({ gameroom, currentPlayer }) {
    const diceValue = rollDice();
    if (currentPlayer === "P1") {
        const newPosition = gameroom.P1POS + diceValue;
        if (newPosition === 100) {
            handleGameVictory({ "gameroom": gameroom, "player": "P1" })
            return;
        }
        else if (newPosition > 100) {
            handleNotValidMove({ socket: gameroom.P1, message: "Not a valid move, square is above 100!" })
            gameroom.TURN = "P2";
            return;
        }
        else {
            const { newPosition, message } = updatePlayerPostion({ "diceResult": diceValue, "playerPosition": gameroom.P1POS });
            gameroom.P1POS = newPosition;
            gameroom.TURN = "P2";
            handleUserUpdation({ "gameroom": gameroom, "message": message, "diceValue": diceValue })
            return;
        }
    }
    else {
        const newPosition = gameroom.P2POS + diceValue;
        if (newPosition === 100) {
            handleGameVictory({ "gameroom": gameroom, "player": "P2" })
            return;
        }
        else if (newPosition > 100) {
            handleNotValidMove({ socket: gameroom.P2, message: "Not a valid move, square is above 100!" })
            gameroom.TURN = "P1";
            return;
        }
        else {
            const { newPosition, message } = updatePlayerPostion({ "diceResult": diceValue, "playerPosition": gameroom.P2POS });
            gameroom.P2POS = newPosition;
            gameroom.TURN = "P1";
            handleUserUpdation({ "gameroom": gameroom, "message": message, "diceValue": diceValue })
            return;
        }
    }
}

//checks for all the moves in the board and updates the playerpositon.
function updatePlayerPostion({ diceResult, playerPosition }) {
    const pos = playerPosition + diceResult;
    if (pos in ladders) {
        return { "newPosition": ladders[pos], "message": `Player moved from${playerPosition} to ${pos} (ladder ${ladders[pos]})` };
    }
    else if (pos in snakes) {
        return { "newPosition": snakes[pos], "message": `Player moved from ${playerPosition} to ${pos} (snake ${snakes[pos]})` };
    }
    return { "newPosition": pos, "message": `Player  moved from ${playerPosition} to ${pos}` };
}

//generates a random number between 1 and 6 for the dice.
function rollDice() {
    const randInt = Math.random() * (7 - 1) + 1;
    return Math.floor(randInt);
}

// winning a match is handeled my this fuction
function handleGameVictory({ gameroom, player }) {
    if (player === "P1") {
        gameroom.P1.send(JSON.stringify({ "type": "WON", "payload": { "message": "You won the game!" } }));
        gameroom.P2.send(JSON.stringify({ "type": "LOST", "payload": { "message": "You lost the game!" } }));
    }
    else {
        gameroom.P2.send(JSON.stringify({ "type": "WON", "payload": { "message": "You won the game!" } }));
        gameroom.P1.send(JSON.stringify({ "type": "LOST", "payload": { "message": "You lost the game!" } }));
    }
}


// handles the not valid move messages gracefully.
function handleNotValidMove({ socket, message }) {
    socket.send(JSON.stringify({ type: "INVALID-MOVE", "payload": { "message": message } }))
}

// handles the part where the players in the frontend are updated with the new position
function handleUserUpdation({ gameroom, message, diceValue }) {
    gameroom.P1.send(JSON.stringify({ "type": "MOVE", payload: { "P1POS": gameroom.P1POS, "P2POS": gameroom.P2POS, "message": message, "dice": diceValue } }))
    gameroom.P2.send(JSON.stringify({ "type": "MOVE", payload: { "P1POS": gameroom.P1POS, "P2POS": gameroom.P2POS, "message": message, "dice": diceValue } }))
}


export { handleNotValidMove, handleStartGame, handlePlayerTurn }