export default class GameRoom {
    currentPlayer = 1;
    player1position = 1;
    player2position = 1;
    constructor(player1socket, player2socket) {
        this.player1 = player1socket;
        this.player2 = player2socket;
    }
    startGame(roomId) {
        this.player1.send(JSON.stringify({ "start-game": true, "roomId": roomId }));
        this.player1.player = 1;
        this.player2.send(JSON.stringify({ "start-game": true, "roomId": roomId }));
        this.player2.player = 2;
    }
    endGame(player) {
        if (player === 1) {
            this.player1.send("you won")
        }
        else {
            this.player1.send("you won")
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
        this.player2.send(JSON.stringify({ "player1position": this.player1position, "player2Position": this.player2position }))
        this.player1.send(JSON.stringify({ "player1position": this.player1position, "player2Position": this.player2position }))
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
}

