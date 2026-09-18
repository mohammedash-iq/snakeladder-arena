- when the user clicks on the start multiplayer game button

- a websocket connection is created in the backend

- this websocket gets to sit in the waiting list array if no other player is in the waiting list.

- if any other player is present in the waiting list, the user gets matched with the player and the game starts.

- the initiation of the game is by creating a game room which consists all the data for the game like, player socket objects, player positons, Player turns etcc.

- now when both the playes get connected and matched with each other , one of them gets to make the move, and he/she can roll the dice, which in result sends a websocket upsteam packet "roll-dice", which when recieved by the backend, checks weather its that socket's turn to make the move, rolls a dice , updates the game data according to game logic and sends the data back to the palyers.

- all the truth is in the backend where all the game logic and palyer connections are handeled.
  \

- If the socket is disconnected from the frontend (player), the backend takes that and lets the other player know that the other player has left and he is the winner. This also applies when the user by himself wants to leave the game.
