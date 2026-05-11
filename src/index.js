import "./styles.css";
import { 
    createGrid, 
    displayPreview, 
    displayMessage,
    resetEndgameUI
} from "./Views/display";
import GameController from "./Controllers/GameController";
import GenerateShips from "./Controllers/GenerateShips";

let playerShips = GenerateShips();
let gameStart = false;

createGrid();
displayPreview(playerShips);

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", (e) => {
    if (gameStart) {
        e.target.textContent = "Start";
        displayMessage("Place your ships to begin!");
        randomizeBtn.disabled = false;
        resetEndgameUI();
        createGrid();
        displayPreview(playerShips);
    } else {
        e.target.textContent = "Restart";
        displayMessage("Your Turn...");
        randomizeBtn.disabled = true;

        // const playerShips = getShips(); // I need getShips to get the ships the user placed by drag and drop
        const computerShips = GenerateShips();
        const game = GameController(playerShips, computerShips);
        game.start();
    }
    gameStart = !gameStart;
});

const randomizeBtn = document.querySelector("#randomize-btn");
randomizeBtn.addEventListener("click", (e) => {
    playerShips = GenerateShips();
    createGrid();
    displayPreview(playerShips);
});
