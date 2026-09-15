- User gets to the snakeladder-arena website.

- the page serves a "start-game" button, when clicked either the user is in waiting page or game arena based on the response user recieves from the backend.

- When the start button is clicked the backend recieves a websocket connection request, which is either added to a list "waiting-list" or if there is already a user in the waiting list, the user gets matched up with the player already present and a new object is created (which consists the player postitons, playerturn, socket objects for both players) and pushed to a array "live-games".

- Now the two players are in the arena, one of the user gets the turn to roll the dice, the dice-roll request is made, the backend takes this request and checks weather its the palyers turn (based on the turn value in the object created earlier and pushed to "live-games"), and generates a random number for the dice, checks weather the move is valid for the board, if valid updates the "live-games" list according to it and sends the players updated board data ( the new positions, the value of the dice rolled).
- this continues troughout the game until one of the players win.

- If the socket is disconnected from the frontend (player), the backend takes that and lets the other player know that the other player has left and he is the winner. This also applies when the user by himself wants to leave the game.
