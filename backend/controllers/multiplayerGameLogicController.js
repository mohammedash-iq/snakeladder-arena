import { findMultiplayerGameRoom } from "../store/multiplayerGameRoom.js";
import { rollDice, updatePlayerPostion } from "../services/gameLogicService.js"

function handleStartGame({ player1socket, player2socket }) {
    player1socket.send(JSON.stringify({ "type": "GAME-STARTED", "payload": { "message": "Game has started!", "player": 1, "TURN": true } }));
    player2socket.send(JSON.stringify({ "type": "GAME-STARTED", "payload": { "message": "Game has started!", "player": 2, "TURN": false } }));
}

function handlePlayerTurn({ playerSocketObject }) {
    const result = findMultiplayerGameRoom({ "socketToBeFound": playerSocketObject })
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
            handleNotValidMove({ "socket": playerSocketObject, "message": "it's not your move!" })
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
    const player = gameroom.TURN === "P1" ? 1 : 2;
    gameroom.P1.send(JSON.stringify({ "type": "MOVE", payload: { "P1POS": gameroom.P1POS, "P2POS": gameroom.P2POS, "message": message, "TURN": gameroom.TURN == "P1" ? true : false, "dice": diceValue } }))
    gameroom.P2.send(JSON.stringify({ "type": "MOVE", payload: { "P1POS": gameroom.P1POS, "P2POS": gameroom.P2POS, "message": message, "TURN": gameroom.TURN == "P2" ? true : false, "dice": diceValue } }))
}


export { handleNotValidMove, handleStartGame, handlePlayerTurn }