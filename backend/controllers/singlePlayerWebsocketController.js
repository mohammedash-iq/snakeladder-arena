// import express from "express";

// const singlePlayerApp = express();
// singlePlayerApp.use(express.json());

// singlePlayerApp.get("/api/start-single-player-game", (req, res) => {
//     // Implement the logic for the single-player game here
//     if (req.body.type === "START-SINGLE-PLAYER-GAME") {
//         const gameRoom = createGameRoom()
//         res.json({ "type": "SINGLE-PLAYER-GAME-STARTED", "payload": { "message": "Single-player game started!", "gameRoom": gameRoom } })
//     }
//     else {
//         res.json({ "type": "ERROR", "payload": { "error": "Not a valid request!" } })
//     }
// })

// export { singlePlayerApp }