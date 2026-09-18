- waiting list structure to store the players who are waiting for the other players
    const waitingList =[WebsocketObject]

- live games array structure to store the live games that is presently ongoing
    const liveGames= [
        {
            P1:WebSocket1, P2:WebSocket2, P1POS:1, P2POS:3, TURN:"P1/P2"
        },
        {
            P1:WebSocket1, P2:WebSocket2, P1POS:1, P2POS:3, TURN:"P1/P2"
        }
    ]


- live single player games array structure to store the live games against the computer.
    const singlePlayerGameRoom =[
        {   
            PLAYER:WebSocket,PLAYERPOS:1,COMPUTERPOS:1,TURN:"player/computer"
        }
    ]

