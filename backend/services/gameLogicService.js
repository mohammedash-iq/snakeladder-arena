


//generates a random number between 1 and 6 for the dice.
function rollDice() {
    const randInt = Math.random() * (7 - 1) + 1;
    return Math.floor(randInt);
}

const snakes = {
    16: 6, 47: 26, 49: 11, 56: 53, 62: 19,
    64: 60, 87: 24, 93: 73, 95: 75, 98: 78
};

const ladders = {
    2: 38, 4: 14, 9: 31, 21: 42, 28: 84,
    36: 44, 51: 67, 71: 91, 80: 99, 85: 97
};

function updatePlayerPostion({ diceResult, playerPosition }) {
    const pos = playerPosition + diceResult;
    if (pos in ladders) {
        return { "newPosition": ladders[pos], "message": `Player moved from${playerPosition} to ${pos} (ladder ${ladders[pos]})` };
    }
    else if (pos in snakes) {
        return { "newPosition": snakes[pos], "message": `Player moved from ${playerPosition} to ${pos} (snake ${snakes[pos]})` };
    }
    return { "newPosition": pos, "message": `Player  moved from ${playerPosition} to ${pos}` };
}

export { rollDice, updatePlayerPostion }