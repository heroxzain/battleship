import "./styles.css";
import { createGrid, getShips } from "./display";
import Player from "./Player";
import GameController from "./GameController";

createGrid();

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", () => {
    const playerShips = getShips("player-board");
    const computerShips = getShips("computer-board");
    const game = GameController(playerShips, computerShips);
    game.start();
});
