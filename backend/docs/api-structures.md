-api structure for websocket responses from the backend for DICE-ROLL request by the frontend:
1. when the move is valid- 
    {
        type:'MOVE',
        payload:{
            P1POS:2,
            P2POS:2,
            message:"here the body of message",
            dice:5
        }
    }

2. when the mve is invalid -
    {
        type: "INVALID-MOVE",
        payload:{
            message: "why the move is invalid"
        }
    }

- api response structure for other events in the game:
1. when the player won the match-
    {
        type:"WON",
        payload:{
            message:"you won the game"
        }
    }

2. when the player lost the match- 
    {
        type:"LOST",
        payload:{
            message:"you lost the game"
        }
    }

-api response structure for game initiation for the user:
1. when the user is in waiting list and waiting another player to join-
    {
        type:"WAITING",
        payload:{
            message:"waiting for the other player to join"
        }
    }

2. when the user gets a player to play with and game starts-
    {
        type:"GAME-STARTED",
        payload:{
            message:"game has started"
        }
    }

-api structure for websocket request from the client:

1. when the user wants to roll the dice-
    {
        request:"ROLL-DICE"
    }

2. when the user wants to leave the game-
    {
        request:"END-GAME"
    }

- api response for any invalid request:
    {
        type: "ERROR", 
        payload: { 
            error: "Invalid request made!" 
            }
    }