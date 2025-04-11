
// game board
// 3x3 array
// render game board

// 1 | 2 | 3
// 4 | 5 | 6
// 7 | 8 | 9
const nought = 'O'
const cross = 'X'

const winningConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]


const gameBoard = (function () {
    const gameBoardArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    renderGame = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            console.log(`${gameBoardArray[i][0]} | ${gameBoardArray[i][1]} | ${gameBoardArray[i][2]}`);
        }
        console.log('');
    }
    updateGameBoard = (position, noughtOrCross) => {
        gameBoardArray[position[0]][position[1]] = noughtOrCross;
        renderGame();
    }

    resetGameBoard = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray.length; j++) {
                gameBoardArray[i][j] = ' ';
            }
            // gameBoardArray[i][0] = ' ';
            // gameBoardArray[i][1] = ' ';
            // gameBoardArray[i][2] = ' ';
        }
        renderGame();
    }
    getGameBoard = () => {
        return gameBoardArray;
    }

    return { updateGameBoard, getGameBoard, resetGameBoard }
})();

function player() {
    setUpPlayer = (playerName, playerPiece) => {
        setPlayerName(playerName);
        setPlayerPiece(playerPiece);
    }
    getPlayerName = () => { return playerName };
    setPlayerName = (playerName) => { this.playerName = playerName };
    getPlayerPiece = () => { return playerPiece };
    setPlayerPiece = (playerPiece) => { this.playerPiece = playerPiece };

    displayPlayerDetails = () => {
        return `Player Name: ${getPlayerName()}
Player Piece: ${getPlayerPiece()}`
    }

    return { getPlayerName, getPlayerPiece, displayPlayerDetails, setUpPlayer };
}

const gameController = (function () {

    //newGameBoard = gameBoard();
    //newGameBoard.renderGame();
    gameBoardArray = getGameBoard();

    const gameTurn = (position, noughtOrCross) => {
        if (gameBoardArray[position[0]][position[1]] === nought || gameBoardArray[position[0]][position[1]] === cross) {
            console.log("Space already taken try again...")
        } else {
            gameBoard.updateGameBoard(position, noughtOrCross)
        }
    }

    // const checkWinCondition = () => {
    //     const xPosition = gameBoardArray.filter((position) => {
    //         return position === 'X'
    //     })
    //     const oPosition = gameBoardArray.filter((position) => {
    //         return position === 'O'
    //     })
    //     xPosition.filter((result) => {
    //         return winningConditions
    //     })
    //     oPosition.filter((result) => {
    //         return winningConditions
    //     })
    //     /* 
    //     check if the gameboard matches any of the results array
    //     if gameboardarray 
    //     */
    //     console.log('YOU WIN!!')
    // }

    return { gameTurn };
})();

player1 = player();
player1.setUpPlayer('Steve', 'X');
console.log(player1.displayPlayerDetails());
gameController.gameTurn([0, 1], player1.getPlayerPiece());
gameController.gameTurn([1, 1], 'O');
gameBoard.resetGameBoard();




// players
// player input/choice
// player name

// computer input/choice


// game operation
// takes inputs
// updates gameboard
// checks for win scenario