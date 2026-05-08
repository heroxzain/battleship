import Gameboard from "./Gameboard";
export default class Player {
    #board;
    #sorted;
    constructor(ships) {
        this.#sorted = [];
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
        this.#board.receiveAttack(coords);
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
}
