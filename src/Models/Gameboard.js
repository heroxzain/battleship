import Ship from "./Ship";
export default class Gameboard {
  #ships;
  #board;
  #totalShips;
  constructor() {
    this.#ships = [];
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
      this.#ships.push(ship);
      this.#totalShips++;
    } else if (axis === "y") {
      for (let i = 0; i < length; i++) {
        this.#board[coords[0] - 1 + i][coords[1] - 1] = ship;
      }
      this.#ships.push(ship);
      this.#totalShips++;
    }
  }

  receiveAttack(coords) {
    if (this.#checkBounds(coords)) return;
    const temp = this.#board[coords[0] - 1][coords[1] - 1];
    if (temp === null) {
      this.#board[coords[0] - 1][coords[1] - 1] = -1;
      return [];
    } else if (temp === 0 || temp === -1) {
      return [];
    } else {
      temp.hit();
      this.#board[coords[0] - 1][coords[1] - 1] = 0;
      if (temp.isSunk()) this.#totalShips--;
      return this.#hitNearbyCoords(coords, temp);
    }
  }

  #hitNearbyCoords(coords, ship) {
    const storage = [];
    if (!ship.isSunk()) {
      const diagOffsets = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
      for (const [dx, dy] of diagOffsets) {
        const x = (coords[0] - 1) + dx;
        const y = (coords[1] - 1) + dy;
        if (!this.#checkBounds([x + 1, y + 1]) && this.#board[x][y] === null) {
          this.#board[x][y] = -1;
          storage.push([x + 1, y + 1]);
        }
      }
      return storage;
    }

    const visited = [];
    const queue = [[coords[0] - 1, coords[1] - 1]];
    const allOffsets = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0],           [1, 0],
      [-1, 1],  [0, 1],  [1, 1]
    ];

    visited.push(`${queue[0][0]},${queue[0][1]}`);
    while(queue.length > 0) {
      const ship = queue.shift();
      for (const [dx, dy] of allOffsets) {
        const x = ship[0] + dx;
        const y = ship[1] + dy;
        
        if (!this.#checkBounds([x + 1, y + 1])) {
          const cell = this.#board[x][y];
          if (cell === null) {
            this.#board[x][y] = -1;
            storage.push([x + 1, y + 1]);
          } else if (cell === 0) {
            const sunkPiece = `${x},${y}`;
            if (!visited.includes(sunkPiece)) {
              visited.push(sunkPiece);
              queue.push([x, y]);
            }
          }
        }
      }
    }
/* BFS Flood Fill Algorithm:
This for loop is converted into something else. It will be transformed into solution!!! 
We have a coord of sunk ship, now what? 
Now we use that coord to get all nearby coords. 
The nearby coords are what? 
These are just filled with null or 0 or -1. 
Now what are next steps? 
We traverse each coord and do the following: 
- If coord is "null": then convert it to -1 (i.e. convert non visited cell to missed cell - automatically)
- If coord is -1: then do nothing!!! It is already missed, we don't need to touch it! 
- If coord is 0: then we found the next piece of ship! We check if it is already visited or not! 
- - If that coord of ship is visited: then we skip it and keep traversing 
- - If that coord is not visited: then we enqueue it! And keep traversing
Now after traversing all values or current coord, we move to next coord and repeat from start! 
If the queue is empty, then that is the terminating condition because all the zeros (coords) of that ship are inside visited!
*/
    return storage;
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
    return this.#totalShips === 0;
  }

  allShips() {
    return this.#ships;
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
