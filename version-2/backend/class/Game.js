export default class GameRoom {
    currentPlayer = 1;
    player1Position = 1;
    player2Position = 1;
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
            this.player2.send(JSON.stringify({ "type": "lose" }))
        }
        else {
            this.player2.send(JSON.stringify({ "type": "win" }))
            this.player1.send(JSON.stringify({ "type": "lose" }))
        }
    }
    updatePosition(position) {
        if (this.currentPlayer === 1) {
            this.player1Position = position;
            this.currentPlayer = 2;
        }
        else {
            this.player2Position = position;
            this.currentPlayer = 1;
        }
        this.player2.send(JSON.stringify({ "type": "move", "player1Position": this.player1Position, "player2Position": this.player2Position }))
        this.player1.send(JSON.stringify({ "type": "move", "player1Position": this.player1Position, "player2Position": this.player2Position }))
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

