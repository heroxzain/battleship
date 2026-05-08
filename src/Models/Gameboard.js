import Ship from "./Ship";
export default class Gameboard {
  #board;
  #totalShips;
  constructor() {
    this.#totalShips = 0;
    this.#board = [];
    for (let i = 0; i < 10; i++) {
      this.#board.push([]);
      for (let j = 0; j < 10; j++) {
        this.#board[i].push(null);
      }
    }
  }

  getBoard() {
    return this.#board;
  }

  placeShip(coords = [1, 1], length = 1, axis = "x") {
    if (this.#checkBounds(coords, length, axis)) return;
    const ship = new Ship(length);
    if (axis === "x") {
      for (let i = 0; i < length; i++) {
        this.#board[coords[0] - 1][coords[1] - 1 + i] = ship;
      }
      this.#totalShips++;
    } else if (axis === "y") {
      for (let i = 0; i < length; i++) {
        this.#board[coords[0] - 1 + i][coords[1] - 1] = ship;
      }
      this.#totalShips++;
    }
  }

  receiveAttack(coords) {
    if (this.#checkBounds(coords)) return;
    const temp = this.#board[coords[0] - 1][coords[1] - 1];
    if (temp === null) {
      this.#board[coords[0] - 1][coords[1] - 1] = -1;
    } else if (temp === 0) {
      return;
    } else {
      temp.hit();
      this.#board[coords[0] - 1][coords[1] - 1] = 0;
      if (temp.isSunk()) return this.#totalShips--;
    }
  }

  #checkBounds(coords, length = 1, axis = "x") {
    const x = coords[0];
    const y = coords[1];
    const l = length;
    if ((x > 0 && x <= 10) && (y > 0 && y <= 10) && (l > 0 && l <= 5)) {
      if (axis === "x" && (y + l <= 11)) {
          return false;
      } else if (axis === "y" && (x + l <= 11)) {
          return false;
      }
    }
    return true;
  }

  isEmpty() {
    if (this.#totalShips === 0) return true;
    return false;
  }
}

/* Board:
[
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
]

-1 : missed attack
0 : hit a ship
1 : health of ship
*/
