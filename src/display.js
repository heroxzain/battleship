function makeBoardEmpty(id) {
    document.querySelector(`#${id}`).innerHTML = "";
}

function createGrid() {
    const gameboard = document.querySelectorAll(".game-board");
    gameboard.forEach(board => {
        makeBoardEmpty(board.id);
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const div = document.createElement("div");
                div.dataset.row = i;
                div.dataset.column = j;
                board.appendChild(div);
            }
        }
    });
}

function displayPreview(ships) {
    ships.forEach(ship => {
        const [x, y] = ship.coords;
        for (let i = 0; i < ship.length; i++) {
            const row = ship.axis === "y" ? (x - 1) + i : (x - 1);
            const col = ship.axis === "x" ? (y - 1) + i : (y - 1);
            
            const cell = document.querySelector(`#player-board [data-row="${row}"][data-column="${col}"]`);
            if (cell) cell.classList.add("ship");
        }
    });
}

function createCell(type, i, j, player = false) {
    const div = document.createElement("div");
    div.dataset.row = i;
    div.dataset.column = j;
    if (type === -1) 
        div.classList.add("missed");
    else if (type === 0) 
        div.classList.add("hit");
    else if (type !== null && player)
        div.classList.add("ship");
    return div;
}

function displayGameBoard(type, gameBoard, playRound = false) {
    makeBoardEmpty(type);
    const displayBoard = document.querySelector(`#${type}`);
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const div = createCell(gameBoard[i][j], i, j, type === "player-board");
            if (typeof playRound === "function") 
                div.addEventListener("click", playRound);
                // div.addEventListener("click", playRound, {once: true});
            displayBoard.appendChild(div);
        }
    }
}

function updateDisplay(type, coords, gameboard) {
    const row = coords[0] - 1;
    const col = coords[1] - 1;
    const cell = document.querySelector(`#${type} [data-row="${row}"][data-column="${col}"]`);
    const cellState = gameboard[row][col];
    if (cellState === -1) {
        cell.classList.add("missed");
    } else if (cellState === 0) {
        cell.classList.add("hit");
    }
}

function displayWinner(name) {
    if (name === "Player")
        displayMessage("You Won!");
    else 
        displayMessage("You Lose!");
}

function displayMessage(msg) {
    document.querySelector("#game-status").textContent = msg;
}

export {
    createGrid, 
    displayPreview,
    displayGameBoard, 
    updateDisplay, 
    displayWinner,
    displayMessage
};


// function createShips(board, id) {
//     if (id === "computer-board")
//         return GenerateShips();
//     const sorted = [];
//     for (let x = 1; x <= 10; x++) {
//         for (let y = 1; y <= 10; y++) {
//             sorted.push([x, y]);
//         }
//     }

//     const ships = [];
//     board.forEach(cell => {
//         if (cell.class === "ship") {
//             ships.push({
//                 coords: [cell.dataset.row, cell.dataset.column],
//                 length: cell.size(),
//                 axis: (cell.size() % 2) ? "y" : "x",
//             }); // horizontal axis for odd size ships, vertical axis for all even size ships
//         };
//     });
//     return ships;
// }

// function getShips(id) {
//     const board = document.querySelector(`#${id}`);
//     const ships = createShips(board, id);
//     return ships;
// }
