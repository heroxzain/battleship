export default class Ship {
    // Private Variables:
    #length
    #health

    constructor(length = 1) {
        this.#length = length;
        this.#health = length;
    }

    hit() {
        if (this.#health > 0)
            this.#health--;
    }

    isSunk() {
        return this.#health <= 0;
    }

    health() {
        return this.#health;
    }

    size() {
        return this.#length;
    }

    fullHP() {
        return this.#health === this.#length;
    }
}
