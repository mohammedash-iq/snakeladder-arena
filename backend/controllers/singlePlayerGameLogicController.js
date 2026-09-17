import { findSinglePlayerGameRoom } from "../store/singlePlayerGameRoom.js"
import { rollDice, updatePlayerPostion } from "../services/gameLogicService.js"


function handleSinglePlayerTurn({ playerSocketObject }) {
    const gameroom = findSinglePlayerGameRoom({ "socketToBeFound": playerSocketObject })
    if (gameroom.found && gameroom.object.TURN === "PLAYER") {
        const diceResult = rollDice();
        const playerPereviosPos = gameroom.object.PLAYERPOS;
        if ((gameroom.object.PLAYERPOS + diceResult) === 100) {
            gameroom.object.PLAYERPOS = gameroom.object.PLAYERPOS + diceResult;
            gameroom.object.PLAYER.send(JSON.stringify({ "type": "MOVE", "payload": { "message": `You moved from ${playerPereviosPos} to ${(gameroom.object.PLAYERPOS + diceResult)}`, P1POS: gameroom.object.PLAYERPOS, "P2POS": gameroom.object.COMPUTERPOS, "TURN": false } }));
            setTimeout(() => { if (gameroom) gameroom.object.PLAYER.send(JSON.stringify({ "type": "WON", "payload": { "message": "you won the match" } })) }, 1000)
        }
        else if ((gameroom.object.PLAYERPOS + diceResult) > 100) {
            //invalid move
        }
        else {
            const { newPosition, message } = updatePlayerPostion({ "playerPosition": playerPereviosPos, "diceResult": diceResult })
            gameroom.object.PLAYERPOS = newPosition;
            gameroom.object.PLAYER.send(JSON.stringify({ "type": "MOVE", payload: { "message": message, "P1POS": newPosition, "P2POS": gameroom.object.COMPUTERPOS, "TURN": false, "dice": diceResult } }))
            handleComputerDiceMove({ "gameroom": gameroom })
        }
    }
    playerSocketObject.send(JSON.stringify({ "type": "ERROR", "payload": { "message": "invalid request for the websocket connection !" } }))
}


function handleComputerDiceMove({ gameroom }) {
    setTimeout(functionLogic, 2000);
    function functionLogic() {
        const previosPlayerPosition = gameroom.object.PLAYERPOS;
        const previosComputerPosition = gameroom.object.COMPUTERPOS;
        //checks weather gameroom is still present as in two seconds the user may have exited the game.
        if (gameroom) {
            const diceResult = rollDice();
            if ((gameroom.object.COMPUTERPOS + diceResult) === 100) {
                gameroom.object.PLAYER.send(JSON.stringify({ "type": "MOVE", "payload": { "message": `computer moved from ${gameroom.object.COMPUTERPOS} to ${(gameroom.object.COMPUTERPOS + diceResult)}`, P1POS: gameroom.object.PLAYERPOS, "P2POS": gameroom.object.COMPUTERPOS, "TURN": false } }));
                setTimeout(() => { if (gameroom) gameroom.object.PLAYER.send(JSON.stringify({ "type": "LOST", "payload": { "message": "you lost the match" } })) }, 1000)
            }
            else if ((gameroom.object.COMPUTERPOS + diceResult) > 100) {
                gameroom.object.PLAYER.send(JSON.stringify({ "type": "INVALID-MOVE", "payload": { "message": "NEW POSITON IS MORE THAN 100" } }));
            }
            else {
                const { newPosition, message } = updatePlayerPostion({ "playerPosition": previosComputerPosition, "diceResult": diceResult })
                gameroom.object.COMPUTERPOS = newPosition;
                gameroom.object.PLAYER.send(JSON.stringify({ "type": "MOVE", payload: { "message": message, "P1POS": previosPlayerPosition, "P2POS": newPosition, "TURN": true, "dice": diceResult } }))
            }
        }
        return;
    }

}


export { handleSinglePlayerTurn }