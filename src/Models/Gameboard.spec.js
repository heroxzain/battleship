import Gameboard from "./Gameboard";
import Ship from "./Ship";

describe("Placing Ships on Gameboard", () => {
  let board;
  beforeEach(() => {
    board = new Gameboard();
  });

  test("Getting empty board", () => {
    expect(board.getBoard()).toEqual([
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
    ]);
  });

  test("Placing a single ship", () => {
    const ship = new Ship();
    board.placeShip([4, 7]);
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, new Ship(), null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Placing a double ship", () => {
    board.placeShip([4, 7], 2);
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, new Ship(), new Ship(), null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Placing a BattleShip on vertical axis", () => {
    board.placeShip([3, 3], 4, "y");
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });
});

describe("Attacking on Ships on Gameboard", () => {
  let board;
  beforeEach(() => {
    board = new Gameboard();
  });

  test("Hitting an empty area", () => {
    board.receiveAttack([3, 3]);
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, -1, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Destroying a single ship", () => {
    board.placeShip([3, 3]);
    board.receiveAttack([3, 3]);
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, -1, -1, -1, null, null, null, null, null, null],
      [null, -1, 0, -1, null, null, null, null, null, null],
      [null, -1, -1, -1, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Hitting a BattleShip on opposite axis", () => {
    board.placeShip([3, 3], 4, "y");
    board.receiveAttack([4, 3]);
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, -1, new Ship(), -1, null, null, null, null, null, null],
      [null, null, 0, null, null, null, null, null, null, null],
      [null, -1, new Ship(), -1, null, null, null, null, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Destroying a BattleShip on opposite axis", () => {
    board.placeShip([3, 3], 4, "y");
    board.receiveAttack([4, 3]);
    board.receiveAttack([3, 3]);
    board.receiveAttack([5, 3]);
    board.receiveAttack([6, 3]);
    console.log(board.getBoard())
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, -1, -1, -1, null, null, null, null, null, null],
      [null, -1, 0, -1, null, null, null, null, null, null],
      [null, -1, 0, -1, null, null, null, null, null, null],
      [null, -1, 0, -1, null, null, null, null, null, null],
      [null, -1, 0, -1, null, null, null, null, null, null],
      [null,  -1, -1, -1, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Recording missed attacks correctly", () => {
    board.placeShip([3, 3], 4, "y");
    board.receiveAttack([10, 10]);
    board.receiveAttack([1, 1]);
    board.receiveAttack([5, 5]);
    board.receiveAttack([10, 1]);
    board.receiveAttack([2, 8]);
    expect(board.getBoard()).toEqual([
      [-1, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, -1, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, new Ship(), null, -1, null, null, null, null, null],
      [null, null, new Ship(), null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [-1, null, null, null, null, null, null, null, null, -1],
    ]);
  });
});

describe("Bounds Checking on Placing and Attacking Methods", () => {
  let board;
  beforeEach(() => {
    board = new Gameboard();
  });

  test("Placing ships outside the GameBoard", () => {
    board.placeShip([100, -100]);
    expect(board.getBoard()).toEqual([
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
    ]);
  });

  test("Attacking on ships outside the GameBoard", () => {
    board.placeShip([5, 5]);
    board.receiveAttack([-100, 100]);
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, new Ship(), null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });

  test("Placing titan on valid coords", () => {
    board.placeShip([5, 5], 100);
    expect(board.getBoard()).toEqual([
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
    ]);
  });

  test("Placing Cruiser at the Beach", () => {
    board.placeShip([9, 9], 5);
    expect(board.getBoard()).toEqual([
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
    ]);
  });

  test("Placing Patrol Boats near the Beach", () => {
    board.placeShip([1, 1]);
    board.placeShip([2, 10]);
    board.placeShip([10, 10]);
    expect(board.getBoard()).toEqual([
      [new Ship(), null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, new Ship()],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, new Ship()],
    ]);
  });

  test("Placing Two BattleShip near the Beach", () => {
    board.placeShip([2, 9], 4, "y");
    board.placeShip([9, 2], 4, "x");
    expect(board.getBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, new Ship(), null],
      [null, null, null, null, null, null, null, null, new Ship(), null],
      [null, null, null, null, null, null, null, null, new Ship(), null],
      [null, null, null, null, null, null, null, null, new Ship(), null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, new Ship(), new Ship(), new Ship(), new Ship(), null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });
});

describe("Testing if all ships are sunk or not", () => {
  let board;
  beforeEach(() => {
    board = new Gameboard();
  });

  test("Board is initially empty", () => {
    expect(board.isEmpty()).toBe(true);
  });

  test("Placing a cruiser and checking", () => {
    board.placeShip([5, 5], 5);
    expect(board.isEmpty()).toBe(false);
  });

  test("Destroying a ship and checking", () => {
    board.placeShip([5, 5]);
    board.receiveAttack([5, 5]);
    expect(board.isEmpty()).toBe(true);
  });

  test("Working of the Ships List by sinking a ship", () => {
    board.placeShip([5, 5]);
    board.receiveAttack([5, 5]);
    expect(board.allShips()[0].isSunk()).toBe(true);
  });
});
