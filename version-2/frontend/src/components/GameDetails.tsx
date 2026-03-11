function GameDetails() {
    function rollDice() {
        //goes to server and asks it to roll the dice and updates the player movement and position
        console.log("dice rolled")
    }
    return (
        <>
            <button id="dice-btn" onClick={rollDice}> Roll Dice</button>
            <p>Turn :You</p>
            <p>Dice result: <span id="dice-result"></span></p>
        </>

    )
}

export default GameDetails