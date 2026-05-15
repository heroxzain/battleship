import "./styles.css";
import { 
    createGrid, 
    displayPreview, 
    displayMessage,
    resetEndgameUI,
    displayShips,
    updateDisplay
} from "./Views/display";
import GameController from "./Controllers/GameController";
import GenerateShips from "./Controllers/GenerateShips";
import newShips from "./Controllers/DragAndDrop";

let playerShips = GenerateShips();
let gameStatus = false;

createGrid();
displayPreview(playerShips);
displayShips("player-ships", playerShips);
newShips(playerShips, updateShips, validateSingleShip);

const startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", (e) => {
    if (gameStatus) {
        e.target.textContent = "Start";
        displayMessage("Place your ships to begin!");
        randomizeBtn.disabled = false;
        resetEndgameUI();
        createGrid();
        displayPreview(playerShips);
        displayShips("player-ships", playerShips);
    } else {
        e.target.textContent = "Restart";
        displayMessage("Your Turn...");
        randomizeBtn.disabled = true;

        const computerShips = GenerateShips();
        displayShips("computer-ships", computerShips);
        const game = GameController(playerShips, computerShips);
        game.start();
    }
    gameStatus = !gameStatus;
});

const randomizeBtn = document.querySelector("#randomize-btn");
randomizeBtn.addEventListener("click", (e) => {
    playerShips = GenerateShips();
    createGrid();
    displayPreview(playerShips);
    newShips(playerShips, updateShips, validateSingleShip);
});

function updateShips(newCoords, index) {
    const targetShip = playerShips[index];
    const originalCoords = [...targetShip.coords]; 
    targetShip.coords = newCoords;

    const isValid = validateSingleShip(targetShip, playerShips, index);
    if (!isValid) { 
        targetShip.coords = originalCoords; 
        return; 
    }
    createGrid();
    displayPreview(playerShips);
}

function validateSingleShip(proposedShip, allShips, currentIndex) {
    const [startX, startY] = proposedShip.coords;
    const length = proposedShip.length;
    const axis = proposedShip.axis;

    if (startX < 1 || startY < 1) return false;
    if (axis === "x" && startY + length - 1 > 10) return false;
    if (axis === "y" && startX + length - 1 > 10) return false;

    const occupiedSet = new Set();
    
    allShips.forEach((ship, index) => {
        if (index === currentIndex) return;
        
        const [ox, oy] = ship.coords;
        for (let i = 0; i < ship.length; i++) {
            const cx = ship.axis === "y" ? ox + i : ox;
            const cy = ship.axis === "x" ? oy + i : oy;
            occupiedSet.add(`${cx},${cy}`);
        }
    });

    const checkOffsets = [
        [0, 0], [-1, -1], [0, -1], [1, -1],
        [-1, 0],           [1, 0],
        [-1, 1],  [0, 1],  [1, 1]
    ];

    for (let i = 0; i < length; i++) {
        const px = axis === "y" ? startX + i : startX;
        const py = axis === "x" ? startY + i : startY;

        for (const [dx, dy] of checkOffsets) {
            if (occupiedSet.has(`${px + dx},${py + dy}`)) {
                return false;
            }
        }
    }

    return true;
}
