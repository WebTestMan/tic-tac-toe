
// game board
// 3x3 array
// render game board

// 1 | 2 | 3
// 4 | 5 | 6
// 7 | 8 | 9

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
    const nought = 'O'
    const cross = 'X'

    const gameBoardArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    const renderGame = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            console.log(`${gameBoardArray[i][0]} | ${gameBoardArray[i][1]} | ${gameBoardArray[i][2]}`);
        }
        console.log('');
    }
    const updateGameBoard = (position, noughtOrCross) => {
        gameBoardArray[position[0]][position[1]] = noughtOrCross;
        renderGame();
    }

    const gameTurn = (position, noughtOrCross) => {
        if (gameBoardArray[position[0]][position[1]] === nought || gameBoardArray[position[0]][position[1]] === cross) {
            console.log("Space already taken try again...")
        } else {
            updateGameBoard(position, noughtOrCross);
            checkWinCondition();
        }
    }

    const checkWinCondition = () => {
        const xPosition = gameBoardArray.filter((position) => {
            return position === 'X'
        })
        const oPosition = gameBoardArray.filter((position) => {
            return position === 'O'
        })
        xPosition.filter((result) => {
            return winningConditions
        })

        oPosition.filter((result) => {
            return winningConditions
        })

        /* 
        check if the gameboard matches any of the results array
        if gameboardarray 
        */

        console.log('YOU WIN!!')
    }
    return { gameTurn };
})();

function player() {
    getPlayerName = () => { return playerName };
    setPlayerName = (playerName) => { this.playerName = playerName };
    getPlayerPiece = () => { return playerPiece };
    setPlayerPiece = (playerPiece) => { this.playerPiece = playerPiece };

    return { getPlayerName, setPlayerName, getPlayerPiece, setPlayerPiece };
}

gameBoard.gameTurn([0, 1], 'X');

player1 = player();
player1.setPlayerName('Steve');
player1.setPlayerPiece('X');
console.log(player1.getPlayerName());
console.log(player1.getPlayerPiece());




// players
// player input/choice
// player name

// computer input/choice


// game operation
// takes inputs
// updates gameboard
// checks for win scenario