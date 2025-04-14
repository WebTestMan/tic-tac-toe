
// 1 | 2 | 3
// 4 | 5 | 6
// 7 | 8 | 9
const nought = 'O'
const cross = 'X'




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
        }
        renderGame();
    }
    getGameBoard = () => {
        return gameBoardArray;
    }

    return { updateGameBoard, getGameBoard, resetGameBoard }
})();

function player() {

    let playerName = '';
    let playerPiece = '';
    setUpPlayer = (playerNameInput, playerPieceInput) => {
        setPlayerName(playerNameInput);
        setPlayerPiece(playerPieceInput);
    }
    getPlayerName = () => playerName;
    setPlayerName = (playerNameInput) => playerName = playerNameInput;

    getPlayerPiece = () => playerPiece;
    setPlayerPiece = (playerPieceInput) => playerPiece = playerPieceInput;

    let playerScore = 0;
    increasePlayerScore = () => playerScore++;
    setPlayerScore = (scoreInput) => playerScore = scoreInput;
    getPlayerScore = () => playerScore;

    displayPlayerDetails = () => {
        return `Player Name: ${getPlayerName()}
Player Piece: ${playerPiece}
Player Score: ${playerScore}`
    }

    setUpOpponent = () => {
        return setUpPlayer(randomOpponentName(), 'X');
    }

    randomOpponentName = () => {
        const opponentNameList = [
            'Hal',
            'DeepThought',
            'T-500',
            'Jarvis',
            'Friday',
        ];
        return opponentNameList[Math.floor(Math.random() * opponentNameList.length)];
    }

    return { getPlayerName, getPlayerPiece, displayPlayerDetails, setUpPlayer, setUpOpponent, increasePlayerScore, getPlayerScore, setPlayerScore };
}

const gameController = (function () {
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
    gameBoardArray = gameBoard.getGameBoard();

    const gameTurn = (position, noughtOrCross) => {
        if (gameBoardArray[position[0]][position[1]] === nought || gameBoardArray[position[0]][position[1]] === cross) {
            console.log("Space already taken try again...")
        } else {
            gameBoard.updateGameBoard(position, noughtOrCross)
            checkWinCondition();
        }
    }

    const checkWinCondition = () => {
        let oPosition = [];
        let xPosition = [];


        for (let i = 0; i < gameBoardArray.length; i++) {
            oPosition.push(gameBoardArray[i].filter((position) => {
                return position === nought
            }))
        }
        let oWinner = false;
        for (let i = 0; i < oPosition.length; i++) {
            if (oPosition[i].length === 3) {
                oWinner = true;
            }
        }

        for (let i = 0; i < gameBoardArray.length; i++) {
            xPosition.push(gameBoardArray[i].filter((position) => {
                return position === cross
            }))
        }

        let xWinner = false;
        for (let i = 0; i < xPosition.length; i++) {
            if (xPosition[i].length === 3) {
                xWinner = true;
            }
        }

        if (xWinner === true || oWinner === true) {
            let winner;
            if (xWinner === true) {
                winner = 'X'
            } else if (oWinner === true) {
                winner = 'O'
            }
            console.log(winner + ' wins!!!');
            console.log('');
        }

        /* 
        check if the gameboard matches any of the results array
        if gameboardarray 
        */
    }

    return { gameTurn, checkWinCondition };
})();

player1 = player();
player1.setUpPlayer('Steve', 'O');
console.log('Player 1 ' + player1.displayPlayerDetails());

aiPlayer = player();
aiPlayer.setUpPlayer(randomOpponentName(), 'X');
console.log('AI ' + aiPlayer.displayPlayerDetails());

const aiPlayerName = aiPlayer.getPlayerName();
const player1Name = player1.getPlayerName();
console.log(`The players are Human: ${player1Name} & AI: ${aiPlayerName}`);

gameController.gameTurn([0, 0], player1.getPlayerPiece());
gameController.gameTurn([1, 0], aiPlayer.getPlayerPiece());
gameController.gameTurn([0, 1], player1.getPlayerPiece());
gameController.gameTurn([1, 1], aiPlayer.getPlayerPiece());
gameController.gameTurn([0, 2], player1.getPlayerPiece());
gameController.gameTurn([1, 2], aiPlayer.getPlayerPiece());
gameController.gameTurn([2, 0], player1.getPlayerPiece());
gameController.gameTurn([2, 1], aiPlayer.getPlayerPiece());
gameController.gameTurn([2, 2], player1.getPlayerPiece());

// gameController.checkWinCondition();


// checks for win scenario