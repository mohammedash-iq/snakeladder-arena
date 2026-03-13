export default class GameRoom {
    currentPlayer = 1;
    player1position = 1;
    player2position = 1;
    constructor(player1socket, player2socket) {
        this.player1 = player1socket;
        this.player2 = player2socket;
    }
    startGame(roomId) {
        this.player1.send(JSON.stringify({ "type": "start", "roomId": roomId }));
        this.player1.gameData = { "roomId": roomId, "player": 1 }
        this.player2.send(JSON.stringify({ "type": "start", "roomId": roomId }));
        this.player2.gameData = { "roomId": roomId, "player": 2 }
    }
    endGame(player) {
        if (player === 1) {
            this.player1.send(JSON.stringify({ "type": "win" }))
        }
        else {
            this.player1.send(JSON.stringify({ "type": "win" }))
        }
    }
    updatePosition(position) {
        if (this.currentPlayer === 1) {
            this.player1position = position;
            this.currentPlayer = 2;
        }
        else {
            this.player2position = position;
            this.currentPlayer = 1;
        }
        this.player2.send(JSON.stringify({ "type": "move", "player1position": this.player1position, "player2Position": this.player2position }))
        this.player1.send(JSON.stringify({ "type": "move", "player1position": this.player1position, "player2Position": this.player2position }))
    }
    notValidPlayer(player) {
        if (player === 1) {
            this.player1.send(JSON.stringify({ "type": "message", "content": "not your move!" }))
        }
        else {
            this.player2.send(JSON.stringify({ "type": "message", "content": "not your move!" }))
        }
    }
    notValidMove(message) {
        if (this.currentPlayer === 1) {
            this.player1.send(message);
            this.currentPlayer = 2;
        }
        else {
            this.player2.send(message)
            this.currentPlayer = 1;
        }
    }
    handleLostConnection({ leftPlayer }) {
        if (this.player1.gameData.player === leftPlayer) {
            this.player2.send(JSON.stringify({ "type": "win", "content": "the other player left you win" }))
        }
        if (this.player2.gameData.player === leftPlayer) {
            this.player1.send(JSON.stringify({ "type": "win", "content": "the other player left you win" }))
        }
    }
}

