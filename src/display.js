function createGrid() {
    const gameboard = document.querySelectorAll(".game-board");
    gameboard.forEach(board => {
        for (let i = 0; i < 100; i++) {
            const div = document.createElement("div");
            board.appendChild(div);
        }
    });
}

function createCell(type) {
    const div = document.createElement("div");
    if (type === -1) 
        return div.classList.add("missed");
    else if (type === 0) 
        return div.classList.add("hit");
    else return div;
}

function displayGameBoard(gameBoard) {
    const displayBoards = document.querySelectorAll('.game-board');
    displayBoards.forEach(board => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const div = createCell(gameBoard[i][j]);
                board.appendChild(div);
            }
        }
    });
}

// Don't use displayGameBoard yet! Fix it first!
export {createGrid, displayGameBoard};
