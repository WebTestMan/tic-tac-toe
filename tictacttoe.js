
// game board
// 3x3 array
// render game board

const gameBoard = (function () {
    const nought = 'O'
    const cross = 'X'

    const gameBoardArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    const renderGame = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            console.log(`${gameBoardArray[i][0]} | ${gameBoardArray[i][1]} | ${gameBoardArray[i][2]}`);
        }
        console.log('');
    }
    const updateGameBoard = (xPosition, yPosition, noughtOrCross) => {
        gameBoardArray[xPosition][yPosition] = noughtOrCross;
        renderGame();
    }

    const gameTurn = (xPosition, yPosition, noughtOrCross) => {
        if (gameBoardArray[xPosition][yPosition] === nought || gameBoardArray[xPosition][yPosition] === cross) {
            console.log("Space already taken try again...")
        } else {
            updateGameBoard(xPosition, yPosition, noughtOrCross);
        }
    }
    return { gameTurn };
})();

gameBoard.gameTurn(0, 0, 'X');
gameBoard.gameTurn(1, 0, 'O');
gameBoard.gameTurn(1, 0, 'X');






// players
// player input/choice
// player name

// computer input/choice


// game operation
// takes inputs
// updates gameboard
// checks for win scenario