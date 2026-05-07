import Player from "./Player";
import { 
    createGrid,
    displayGameBoard, 
    displayMessage, 
    displayWinner, 
    updateDisplay 
} from "./display";

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
        if (!isPlayerTurn) return; // Prevent clicking during computer's turn
        const coords = createCoords(e);
        computerPlayer.attackTheShip(coords);
        updateDisplay("computer-board", coords, computerPlayer.getGameBoard());
        isPlayerTurn = false;
        if (computerPlayer.checkWinner()) 
            return displayWinner("Player");
        displayMessage("Computer is thinking...");
        setTimeout(() => { computerAttack(); }, 1000);
    };

    const computerAttack = () => {
        const coords = createCoords();
        humanPlayer.attackTheShip(coords);
        updateDisplay("player-board", coords, humanPlayer.getGameBoard());
        if (humanPlayer.checkWinner())
            return displayWinner("Computer");
        isPlayerTurn = true;
        displayMessage("Your Turn...");
    }

    const start = () => {
        displayGameBoard("player-board", humanPlayer.getGameBoard());
        displayGameBoard("computer-board", computerPlayer.getGameBoard(), playRound);
    };

    return { start };
}
