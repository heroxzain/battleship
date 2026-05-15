import Player from "../Models/Player";
import { 
    createGrid,
    displayGameBoard, 
    displayMessage, 
    displayRemainingShips, 
    displayWinner, 
    updateDisplay 
} from "../Views/display";

export default function GameController(playerShips, computerShips) {
    const humanPlayer = new Player(playerShips);
    const computerPlayer = new Player(computerShips);
    let isPlayerTurn = true;
    
    const createCoords = (e = false) => {
        if (!!e) {
            const x = parseInt(e.target.dataset.row) + 1;
            const y = parseInt(e.target.dataset.column) + 1;
            return [x, y];
        } 
        return computerPlayer.generateComputerAttack();
    }

    const playRound = (e) => {
        if (!isPlayerTurn) return;
        if (!e.target.dataset.row) return; 
        if (e.target.classList.contains("hit") || e.target.classList.contains("missed")) return;
        const coords = createCoords(e);
        computerPlayer.attackTheShip(coords);
        syncGUI("computer-board", computerPlayer.getGameBoard());
        displayRemainingShips("computer-ships", computerPlayer.getShips());
        if (computerPlayer.checkWinner()) 
            return displayWinner("Player", computerPlayer.getGameBoard());
        const isHit = computerPlayer.getGameBoard()[coords[0] - 1][coords[1] - 1] === 0;
        if (isHit) {
            displayMessage("You Hit a ship! Fire again...");
            return;
        }
        isPlayerTurn = false;
        displayMessage("You Missed! Computer is thinking...");
        setTimeout(() => { computerAttack(); }, 1000);
    };

    const computerAttack = () => {
        const coords = createCoords();
        const floodedCells = humanPlayer.attackTheShip(coords);
        computerPlayer.removeDeadCoords(floodedCells);
        syncGUI("player-board", humanPlayer.getGameBoard());
        displayRemainingShips("player-ships", humanPlayer.getShips());
        if (humanPlayer.checkWinner())
            return displayWinner("Computer", computerPlayer.getGameBoard());
        const isHit = humanPlayer.getGameBoard()[coords[0] - 1][coords[1] - 1] === 0;
        if (isHit) {
            displayMessage("Enemy Hit your ship! Computer is thinking again...");
            setTimeout(() => { computerAttack(); }, 1000);
            return; 
        }
        isPlayerTurn = true;
        displayMessage("Enemy Missed! Your Turn...");
    }

    const syncGUI = (type, board) => {
        for (let r = 1; r <= 10; r++) {
            for (let c = 1; c <= 10; c++) {
                updateDisplay(type, [r, c], board);
            }
        }
    }
    
    const start = () => {
        displayGameBoard("player-board", humanPlayer.getGameBoard());
        displayGameBoard("computer-board", computerPlayer.getGameBoard(), playRound);
    };

    return { start };
}
