
// 1 | 2 | 3
// 4 | 5 | 6
// 7 | 8 | 9
const nought = 'O'
const cross = 'X'
let currentPlayer = nought;
let nextPlayer = cross;

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    // and for each one we add a 'click' listener
    button.addEventListener("click", () => {
        button.classList.add('class', 'button-clicked');
    });
});




// Game Board Module
const gameBoard = (function () {
    const gameBoardArray = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    renderGame = () => {

        const gameDiv = document.querySelector('.game-display');
        gameDiv.innerHTML = '';
        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray.length; j++) {
                const gameSquare = document.createElement('div');
                gameSquare.setAttribute('class', 'game-square');
                gameSquare.setAttribute('id', `id-${i}-${j}`);
                gameSquare.addEventListener('click', () => {
                    console.log(`${currentPlayer} id-${i}-${j}`)
                    gameController.gameTurn([i, j], currentPlayer);
                });
                gameDiv.appendChild(gameSquare);
            }
        }

    }

    updateGameBoard = (position, noughtOrCross) => {
        gameBoardArray[position[0]][position[1]] = noughtOrCross;
        console.log(`id-${position[0]}-${position[1]} Piece: ${noughtOrCross}`);
        const gameSquare = document.getElementById(`id-${position[0]}-${position[1]}`);
        gameSquare.textContent = noughtOrCross;
    }


    resetGameBoard = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray.length; j++) {
                gameBoardArray[i][j] = ' ';
            }
        }
        renderGame();
        gameController.updateGameStatus('');
    }
    getGameBoard = () => {
        return gameBoardArray;
    }

    return { updateGameBoard, getGameBoard, resetGameBoard, renderGame }
})();




/// Player Factory Function
function player() {

    let playerObject = {
        playerName: 'Steve',
        playerPiece: 'X',
    }

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

// Game Controller module
const gameController = (function () {

    gameBoardArray = gameBoard.getGameBoard();

    const startGame = (player1Info, player2info = false) => {
        let playerObject = {
            playerName: 'Steve',
            playerPiece: 'X',
        }
        if (player1Info) {
            playerObject.playerName = player1Info.playerName;
            playerObject.playerPiece = player1Info.playerPiece = player1Info.piece;
        }

        player1 = player();
        player1.setUpPlayer(playerObject.playerName, playerObject.playerPiece);

        player2 = player();
        if (!player2info) {
            player2.setUpOpponent(player1);
        } else {
            player2.setUpPlayer(player2info.playerName, player2info.playerPiece);
        }
        gameBoard.renderGame();
    }

    const gameTurn = (position, noughtOrCross) => {
        if (currentPlayer === cross) {
            currentPlayer = nought;
            console.log('player changed to O');
        } else if (currentPlayer === nought) {
            currentPlayer = cross;
            console.log('player changed to X');
        }

        updateGameStatus(`${currentPlayer}'s turn...`);
        if (checkTakenPosition(position) === false) {
            gameBoard.updateGameBoard(position, noughtOrCross);
            checkWinCondition(noughtOrCross);
        }
    }

    const checkTakenPosition = (position) => {
        let positionTaken;
        if (gameBoardArray[position[0]][position[1]] === nought || gameBoardArray[position[0]][position[1]] === cross) {
            updateGameStatus("Space already taken try again...");
            positionTaken = true;
        } else {
            positionTaken = false;
        }
        return positionTaken;
    }

    const checkWinCondition = (currentPiece) => {

        const row = 3;
        const col = 3;
        let winStatus = false;

        for (let i = 0; i < col; i++) {
            for (let j = 0; j < col; j++) {
                if (gameBoardArray[i][j] !== currentPiece) {
                    break;
                }
                if (j === col - 1) {
                    winStatus = true;
                }
            }

            for (let j = 0; j < row; j++) {
                if (gameBoardArray[j][i] !== currentPiece) {
                    break;
                }
                if (j === row - 1) {
                    winStatus = true;
                }
            }
        }
        if ((gameBoardArray[0][0] === currentPiece && gameBoardArray[1][1] === currentPiece && gameBoardArray[2][2] === currentPiece)
            || (gameBoardArray[0][2] === currentPiece && gameBoardArray[1][1] === currentPiece && gameBoardArray[2][0] === currentPiece)) {
            winStatus = true;
        }

        if (winStatus === true) {
            const winMessage = `${currentPiece} is the winner!`;
            console.log(winMessage);
            updateGameStatus(winMessage);
            return winMessage;
        }
        checkGameOver();
    }

    const checkGameOver = () => {
        console.log('Checking for game over')
        let fullGameBoard = 0;
        for (i = 0; i < gameBoardArray.length; i++) {
            for (j = 0; j < gameBoardArray.length; j++) {
                if (gameBoardArray[i][j] === nought ||
                    gameBoardArray[i][j] === cross
                ) {
                    fullGameBoard++;
                }
            }

        }
        console.log(fullGameBoard);
        if (fullGameBoard >= 9) {
            updateGameStatus('GAME OVER - DRAW!');
        }
    }

    const updateGameStatus = (message) => {
        const gameStatus = document.querySelector('#game-status');
        gameStatus.textContent = (message);
    }

    return { startGame, gameTurn, checkWinCondition, updateGameStatus };
})();

gameBoard.renderGame();
const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', gameBoard.resetGameBoard);
