import Ship from "./Ship";

describe('Hitting The Ships', () => {
    let BattleShip;
    beforeEach(() => {
        BattleShip = new Ship(4);
    });
    
    test('Hitting the BattleShip Once', () => {
        BattleShip.hit();
        expect(BattleShip.health()).toBe(3);
    });
    
    test('Destroying the BattleShip', () => {
        BattleShip.hit();
        BattleShip.hit();
        BattleShip.hit();
        BattleShip.hit();
        expect(BattleShip.health()).toBe(0);
    });

    test('Heath of BattleShip is not negative', () => {
        BattleShip.hit();
        BattleShip.hit();
        BattleShip.hit();
        BattleShip.hit();
        BattleShip.hit();
        BattleShip.hit();
        expect(BattleShip.health()).toBe(0);
    });
});

describe('Sinking The Ships', () => {
    let Submarine;
    beforeEach(() => {
        Submarine = new Ship(2);
    });
    
    test('Submarine does not Sink on one hit', () => {
        Submarine.hit();
        expect(Submarine.isSunk()).toBe(false);
    });

    test('Sinking the Submarine', () => {
        Submarine.hit();
        Submarine.hit();
        expect(Submarine.isSunk()).toBe(true);
    });

    test('Submarine cannot come out of water after Sinking', () => {
        Submarine.hit();
        Submarine.hit();
        Submarine.hit();
        Submarine.hit();
        Submarine.hit();
        Submarine.hit();
        expect(Submarine.isSunk()).toBe(true);
    });
});
