import "./styles.css";
import { createGrid, displayMessage, getShips } from "./display";
import Player from "./Player";
import GameController from "./GameController";

createGrid();

let gameStart = false;
const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", (e) => {
    if (gameStart) {
        e.target.textContent = "Start";
        displayMessage("Place your ships to begin!");
    } else {
        e.target.textContent = "Restart";
        displayMessage("Your Turn...");
    }
    gameStart = !gameStart;
    const playerShips = getShips("player-board");
    const computerShips = getShips("computer-board");
    const game = GameController(playerShips, computerShips);
    game.start(gameStart);
});
