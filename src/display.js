function makeBoardEmpty(id) {
    const gameboard = document.querySelector(`#${id}`);
    gameboard.innerHTML = "";
}

function createGrid() {
    const gameboard = document.querySelectorAll(".game-board");
    gameboard.forEach(board => {
        makeBoardEmpty(board.id);
        for (let i = 1; i <= 100; i++) {
            const div = document.createElement("div");
            div.id = i;
            board.appendChild(div);
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
                div.addEventListener("click", playRound, {once: true});
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

function createShips(board) {
    const sorted = [];
    for (let x = 1; x <= 10; x++) {
        for (let y = 1; y <= 10; y++) {
            sorted.push([x, y]);
        }
    }

    // const ships = [];
    // board.forEach(cell => {
    //     if (cell.class === "ship") {
    //         ships.push({
    //             coords: [sorted[cell.id]],
    //             length: cell.size(),
    //             axis: (cell.size() % 2) ? y : x,
    //         }); // horizontal axis for odd size ships, vertical axis for all even size ships
    //     };
    // });

    const ships = [
        {coords: [1, 4], length: 5, axis: 'x'},
        {coords: [2, 2], length: 4, axis: 'y'},
        {coords: [6, 7], length: 3, axis: 'x'},
        {coords: [9, 10], length: 2, axis: 'y'},
        {coords: [4, 6], length: 2, axis: 'x'},
        {coords: [10, 1], length: 1, axis: 'x'},
        {coords: [8, 3], length: 1, axis: 'x'},
    ];
    return ships;
}

function getShips(id) {
    const board = document.querySelector(`#${id}`);
    const ships = createShips(board);
    return ships;
}

function displayWinner(name) {

}

export {
    createGrid, 
    getShips, 
    displayGameBoard, 
    updateDisplay, 
    displayWinner
};
