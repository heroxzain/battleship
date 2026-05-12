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
            if (cell) {
                cell.draggable = true;
                cell.classList.add("ship", shipColor(ship.length));
            }
        }
    });
}

function shipColor(size) {
    switch(size) {
        case 5: return "Cruiser";
        case 4: return "BattleShip";
        case 3: return "Destroyer";
        case 2: return "Submarine";
        case 1: return "PatrolBoat";
        default: return "ship";
    }
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
        div.classList.add(shipColor(type.size()));
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

function displayWinner(name, board) {
    const statusDisplay = document.querySelector("#game-status");
    const boardsContainer = document.querySelector(".boards-container");
    if (name === "Player") {
        displayMessage(" YOU WON! ");
        statusDisplay.classList.add("status-win");
    } else {
        displayMessage(" YOU LOSE! ");
        statusDisplay.classList.add("status-lose");
    }
    boardsContainer.classList.add("game-over-fade");
    revealEnemyShips(board);
}

function revealEnemyShips(gameboard) {
    for(let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.querySelector(`#computer-board [data-row="${i}"][data-column="${j}"]`);
            const type = gameboard[i][j];
            if (type !== -1 && type !== 0 && type !== null) 
                cell.classList.add(shipColor());
        }
    }
}

function resetEndgameUI() {
    const statusDisplay = document.querySelector("#game-status");
    const boardsContainer = document.querySelector(".boards-container");
    statusDisplay.classList.remove("status-win", "status-lose");
    boardsContainer.classList.remove("game-over-fade");
    document.querySelector("#player-ships").innerHTML = "";
    document.querySelector("#computer-ships").innerHTML = "";
}

function displayMessage(msg) {
    document.querySelector("#game-status").textContent = msg;
}

function displayShips(type, ships) {
    const container = document.querySelector(`#${type}`);
    container.innerHTML = "";

    ships.forEach((ship, index) => {
        const shipBox = document.createElement("div");
        shipBox.classList.add("mini-ship");

        for (let i = 0; i < ship.length; i++) {
            const piece = document.createElement("span");
            piece.classList.add("mini-cell");
            shipBox.appendChild(piece);
        }
        container.appendChild(shipBox);
    });
}

function displayRemainingShips(type, ships) {
    const container = document.querySelector(`#${type}`);
    container.innerHTML = "";

    ships.forEach(ship => {
        const miniShip = document.createElement("div");
        miniShip.classList.add("mini-ship");
        if (ship.isSunk()) {
            miniShip.classList.add("sunk");
        }

        for (let i = ship.size(); i > 0; i--) {
            const miniCell = document.createElement("span");
            miniCell.classList.add("mini-cell");
            if (i > ship.health() && !ship.fullHP()) {
                miniCell.classList.add("hit");
            }
            miniShip.appendChild(miniCell);
        }
        container.appendChild(miniShip);
    });
}

export {
    createGrid, 
    displayPreview,
    displayGameBoard, 
    updateDisplay, 
    displayWinner,
    displayMessage,
    resetEndgameUI,
    displayShips,
    displayRemainingShips
};
