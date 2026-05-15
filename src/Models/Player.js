import Gameboard from "./Gameboard";
export default class Player {
    #board;
    #sorted;
    #targetQueue;
    constructor(ships) {
        this.#sorted = [];
        this.#targetQueue = [];
        for (let x = 1; x <= 10; x++) {
            for (let y = 1; y <= 10; y++) {
                this.#sorted.push([x, y]);
            }
        }
        this.#board = new Gameboard();
        // Comment this line to run the test: 
        this.#releaseTheBattleShips(ships);
    }

    // these methods will initially receive ships write after the user hit the play button to start the game (because there is at least one human player to start the game)
    #releaseTheBattleShips(ships) {
        ships.forEach(ship => {
            this.#board.placeShip(ship.coords, ship.length, ship.axis);
        });
    }

    // These methods will be used only after the game begins
    attackTheShip(coords) {
        return this.#board.receiveAttack(coords);        
    }

    removeDeadCoords(floodedCoords) {
        floodedCoords.forEach(([deadX, deadY]) => {
            const index = this.#sorted.findIndex(([x, y]) => x === deadX && y === deadY);
            
            if (index !== -1) {
                this.#sorted[index] = this.#sorted[this.#sorted.length - 1];
                this.#sorted.pop();
            }
        });
    }

    checkWinner() {
        return this.#board.isEmpty();
    }

    getGameBoard() {
        return this.#board.getBoard();
    }

    generateComputerAttack() {
        const index = Math.floor(Math.random() * (this.#sorted.length - 1));
        const coords = this.#sorted[index];
        this.#sorted[index] = this.#sorted.pop();
        return coords;
    }

    getShips() {
        return this.#board.allShips();
    }

    generateComputerAttack() {
        while (this.#targetQueue.length > 0) {
            const [tx, ty] = this.#targetQueue.shift();
            const index = this.#sorted.findIndex(([x, y]) => x === tx && y === ty);
            if (index !== -1) {
                const coords = this.#sorted[index];
                this.#sorted[index] = this.#sorted.pop();
                return coords;
            }
        }
        
        const index = Math.floor(Math.random() * (this.#sorted.length - 1));
        const coords = this.#sorted[index];
        this.#sorted[index] = this.#sorted.pop();
        return coords;
    }

    enqueueTargets(coords) {
        const [x, y] = coords;
        const offsets = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        offsets.forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 1 && nx <= 10 && ny >= 1 && ny <= 10) {
                this.#targetQueue.push([nx, ny]);
            }
        });
    }
}
