
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

        const gameDiv = document.querySelector('.game-display');

        for (i = 0; i < 9; i++) {
            const gameSquare = document.createElement('div');
            gameSquare.setAttribute('class', 'game-square');
            gameSquare.setAttribute('id', 'id-' + i);
            gameDiv.appendChild(gameSquare);
        }
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

    return { updateGameBoard, getGameBoard, resetGameBoard, renderGame }
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

    setUpOpponent = (player) => {
        let AIPiece;
        if (player.getPlayerPiece() === 'X') {
            AIPiece = 'O'
        } else {
            AIPiece = 'X'
        }
        return setUpPlayer(randomOpponentName(), AIPiece);
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
    // const winningConditions = [
    //     [1, 2, 3],
    //     [4, 5, 6],
    //     [7, 8, 9],
    //     [1, 4, 7],
    //     [2, 5, 8],
    //     [3, 6, 9],
    //     [1, 5, 9],
    //     [3, 5, 7]
    // ]
    gameBoardArray = gameBoard.getGameBoard();

    const gameTurn = (position, currentPlayer) => {
        const noughtOrCross = currentPlayer.getPlayerPiece();
        if (gameBoardArray[position[0]][position[1]] === nought || gameBoardArray[position[0]][position[1]] === cross) {
            console.log("Space already taken try again...")
        } else {
            gameBoard.updateGameBoard(position, noughtOrCross)
            checkWinCondition(currentPlayer);
        }
    }

    const checkWinCondition = (currentPlayer) => {
        let oPosition = [];
        let xPosition = [];

        const row = 3;
        const col = 3;
        const currentPiece = currentPlayer.getPlayerPiece();
        const currentPlayerName = currentPlayer.getPlayerName()

        for (let i = 0; i < col; i++) {
            for (let j = 0; j < col; j++) {
                if (gameBoardArray[i][j] !== currentPiece) {
                    break;
                }
                if (j === col - 1) {
                    console.log(`${currentPlayerName} is the winner!`);
                    return currentPiece; s
                }
            }

            for (let j = 0; j < row; j++) {
                if (gameBoardArray[j][i] !== currentPiece) {
                    break;
                }
                if (j === row - 1) {
                    console.log(`${currentPlayerName} is the winner!`);
                    return currentPiece;
                }
            }
        }
        if ((gameBoardArray[0][0] === currentPiece && gameBoardArray[1][1] === currentPiece && gameBoardArray[2][2] === currentPiece)
            || (gameBoardArray[0][2] === currentPiece && gameBoardArray[1][1] === currentPiece && gameBoardArray[2][0] === currentPiece)) {
            console.log(`${currentPlayerName} is the winner!`);
            return currentPiece;
        }

    }

    return { gameTurn, checkWinCondition };
})();

gameBoard.renderGame();

// checks for win scenario