// ! TODO: Explicar o código

const botaoReiniciar = document.getElementById("btn-reiniciar");
const refreshIcon = document.getElementById("refresh-icon");


botaoReiniciar.addEventListener("click", function () {
    refreshIcon.classList.add("rotatingSVG");

    setTimeout(() => refreshIcon.classList.remove("rotatingSVG"), 500);
});

// Lógica do jogo

const state = {
    board: Array(9).fill(null),
    currentPlayer: "X",
    gameActive: true,
};


function playMove(index) {
    //O clique do usuário em uma das celulas
    if (!state.gameActive || state.board[index]) return false; // se o jogo não estiver ativo ou a celula já estiver preenchida, retorna false

    state.board[index] = state.currentPlayer; // atribui o valor do jogador atual na celula clicada
    return true;
}

function switchPlayer() {
    state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
    updatePlayerDisplay();
    console.log("Vez de: " + state.currentPlayer);
}


function updatePlayerDisplay() {
    const playerDisplay = document.getElementById("vez-jogador");
    if (playerDisplay) {
        playerDisplay.innerHTML = state.currentPlayer;
    }
}


function renderCell(cell, value) {
    if (!value) return;

    cell.innerHTML = value;
    cell.classList.add("marked");
}


function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute("data-index"));
    if (!playMove(index)) return;

    const currentPlayerIcon = `<img src=${state.currentPlayer}.svg alt=${state.currentPlayer} class="pop-animation">`;
    renderCell(cell, currentPlayerIcon);

    const winningCombination = checkWinner();
    if (winningCombination) {
        endGame("Vitória de " + state.currentPlayer);
        highlightWinningCells(winningCombination);
        return;
    }

    if (isDraw()) {
        endGame("Empate");
        return;
    }

    switchPlayer();
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.find((combination) => {
        const [a, b, c] = combination;
        return (
            state.board[a] &&
            state.board[a] === state.board[b] &&
            state.board[a] === state.board[c]
        );
    });
}

function isDraw() {
    return state.board.every((cell) => cell !== null);
}

function endGame(message) {
    state.gameActive = false;
    setTimeout(() => alert(message), 100);
}

function resetGame() {
    state.board.fill(null);
    state.currentPlayer = "X";
    state.gameActive = true;

    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("marked", "highlight-winning");
    });
    updatePlayerDisplay();
}

const cells = document.querySelectorAll(".grid-cell");
cells.forEach((cell) => cell.addEventListener("click", handleClick));

botaoReiniciar.addEventListener("click", resetGame);

// Inicializa a exibição do jogador atual
updatePlayerDisplay();

function highlightWinningCells(combination) {
    combination.forEach((index) => {
        const cell = document.querySelector(`.grid-cell[data-index='${index}']`);
        if (cell) {
            cell.classList.add("highlight-winning");
        }
    });
}

