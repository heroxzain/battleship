import "./styles.css";
import { createGrid, getShips, displayGameBoard } from "./display";
import Player from "./Player";

createGrid();

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", () => {
    const playerShips = getShips("player-board");
    const computerShips = getShips("computer-board");
    startGame(playerShips, computerShips);
});

function startGame(playerShips, computerShips) {
    const humanPlayer = new Player(playerShips);
    const computerPlayer = new Player(computerShips);
    displayGameBoard("player-board", humanPlayer.getGameBoard());
    displayGameBoard("computer-board", computerPlayer.getGameBoard());
}
