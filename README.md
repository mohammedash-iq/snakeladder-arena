# Real-Time Multiplayer Game

A real-time browser game with multiplayer and single-player modes, built using React, Tailwind CSS, Node.js, and WebSockets.

The backend is authoritative for game state, game rules, player turns, dice rolls, computer moves, and match results. The frontend communicates with the backend through a WebSocket connection and renders the current game state.

## Features

- Real-time multiplayer gameplay
- Single-player mode against the computer
- WebSocket-based communication
- Automatic multiplayer matchmaking
- Backend-authoritative game logic
- Turn management
- Dice rolling handled by the backend
- Win/loss detection
- Player disconnection handling
- Automatic computer turns in single-player mode

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- WebSocket API

### Backend

- Node.js
- `ws` WebSocket library
- In-memory game state

The frontend currently uses TypeScript, although strict TypeScript rules are not enforced throughout the application.

## Project Structure

```text
project-root/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       ├── types/
│       └── utils/
│
├── backend/
│   └── src/
│       ├── websocket/
│       ├── game/
│       ├── rooms/
│       └── utils/
│
├── docs/
│   ├── api-structures.md
│   ├── backend-details.md
│   ├── multiplayer-game-flow.md
│   ├── computer-game-flow.md
│   └── tech-stack.md
│
├── README.md
└── .gitignore
```

## Architecture

The application consists of two main parts:

```text
                 ┌─────────────────────┐
                 │      Frontend       │
                 │  React + Tailwind   │
                 └──────────┬──────────┘
                            │
                     WebSocket
                            │
                            ▼
                 ┌─────────────────────┐
                 │       Backend       │
                 │    Node.js + ws     │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
        Waiting List   Multiplayer   Single Player
                       Game Rooms     Game Rooms
                            │
                            ▼
                      Game Logic
```

The backend is the source of truth for the game.

The frontend sends player actions and renders the state received from the backend. Game calculations should not be duplicated on the frontend.

## Game Modes

### Multiplayer

When a player selects multiplayer:

1. The frontend establishes a WebSocket connection.
2. The backend checks the waiting list.
3. If no other player is waiting, the socket is added to the waiting list.
4. The player receives a `WAITING` message.
5. When another player connects, the two players are matched.
6. The backend creates a game room.
7. Both players are assigned to the room.
8. The backend determines whose turn it is.
9. The active player sends a `ROLL-DICE` request.
10. The backend validates the turn.
11. The backend rolls the dice and updates the game state.
12. The updated state is sent to the players.
13. The process continues until a player wins or loses.

If a player disconnects or explicitly leaves the game, the backend handles the disconnection and informs the remaining player of the game result.

Detailed multiplayer flow:

`docs/multiplayer-game-flow.md`

## Single Player

When a player selects single-player mode:

1. The frontend establishes a WebSocket connection.
2. The backend creates a single-player game room.
3. The game room is stored in the active single-player games collection.
4. The player receives a `SINGLE-PLAYER-GAME-STARTED` message.
5. The player makes a move by sending `ROLL-DICE`.
6. The backend validates and processes the move.
7. The backend sends the updated game state.
8. After a short delay, the backend performs the computer's move.
9. The game state is updated again.
10. This cycle continues until either the player or computer wins.
11. If the player disconnects, the backend removes the corresponding game room.

The backend handles all game logic, including the computer's moves.

Detailed single-player flow:

`docs/computer-game-flow.md`

## WebSocket Protocol

### Client → Backend

#### Roll Dice

```json
{
  "request": "ROLL-DICE"
}
```

Used when the player wants to make a move.

#### End Game

```json
{
  "request": "END-GAME"
}
```

Used when the player wants to leave the current game.

### Backend → Client

#### Waiting

```json
{
  "type": "WAITING",
  "payload": {
    "message": "waiting for the other player to join"
  }
}
```

Sent when a multiplayer player is waiting for an opponent.

#### Game Started

```json
{
  "type": "GAME-STARTED",
  "payload": {
    "message": "game has started"
  }
}
```

Sent when two multiplayer players have been matched.

#### Single Player Game Started

```json
{
  "type": "SINGLE-PLAYER-GAME-STARTED",
  "payload": {
    "message": "Game Started, your move!",
    "player": "P1",
    "TURN": true,
    "PLAYERPOS": 1,
    "COMPUTERPOS": 1
  }
}
```

Sent when a single-player game is initialized.

#### Move

```json
{
  "type": "MOVE",
  "payload": {
    "P1POS": 2,
    "P2POS": 2,
    "message": "here the body of message",
    "dice": 5
  }
}
```

A `MOVE` response contains the updated game state after a valid dice roll.

The response should also communicate whose turn it is so the frontend knows whether it should allow the player to make another move.

#### Invalid Move

```json
{
  "type": "INVALID-MOVE",
  "payload": {
    "message": "why the move is invalid"
  }
}
```

Sent when a player attempts an invalid move.

#### Won

```json
{
  "type": "WON",
  "payload": {
    "message": "you won the game"
  }
}
```

Sent to a player when they win.

#### Lost

```json
{
  "type": "LOST",
  "payload": {
    "message": "you lost the game"
  }
}
```

Sent to a player when they lose.

#### Error

```json
{
  "type": "ERROR",
  "payload": {
    "error": "Invalid request made!"
  }
}
```

Sent when the client sends an unsupported or invalid request.

## Backend Game State

The backend maintains three types of in-memory state.

### Waiting Players

```js
const waitingList = [
  WebSocket
];
```

Contains players waiting for an opponent.

### Multiplayer Games

```js
const liveGames = [
  {
    P1: WebSocket,
    P2: WebSocket,
    P1POS: 1,
    P2POS: 3,
    TURN: "P1"
  }
];
```

Contains currently active multiplayer games.

### Single Player Games

```js
const singlePlayerGameRoom = [
  {
    PLAYER: WebSocket,
    PLAYERPOS: 1,
    COMPUTERPOS: 1,
    TURN: "player"
  }
];
```

Contains currently active games against the computer.

## Important Design Principle

The backend is authoritative.

The frontend should not determine:

- Dice results
- Validity of moves
- Player positions
- Whose turn it is
- Win conditions
- Loss conditions
- Computer moves
- Final game results

The frontend should send player actions and render the state received from the backend.

This prevents the client from becoming a second source of truth.

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The exact scripts and ports depend on the implementation.

## Documentation

More detailed technical documentation is available in the `docs/` directory.

| Document | Description |
|---|---|
| `api-structures.md` | WebSocket request and response structures |
| `backend-details.md` | Backend in-memory game state |
| `multiplayer-game-flow.md` | Multiplayer matchmaking and gameplay flow |
| `computer-game-flow.md` | Single-player and computer gameplay flow |
| `tech-stack.md` | Frontend and backend technology choices |

## Current Limitations

The current backend design stores active game state in memory.

This means active games are lost if the backend process restarts.

The current design is therefore suitable for a simple or prototype deployment. A persistent or horizontally scalable production architecture would require external state management and additional connection/session handling.

The frontend also uses TypeScript without strict enforcement of TypeScript rules.