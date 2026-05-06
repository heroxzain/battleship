import Player from "./Player";
import { displayGameBoard, displayWinner } from "./display";

export default function GameController(playerShips, computerShips) {
    const humanPlayer = new Player(playerShips);
    const computerPlayer = new Player(computerShips);
    let isPlayerTurn = true;
    
    const playRound = (e) => {
        if (!isPlayerTurn) return; // Prevent clicking during computer's turn

        const x = parseInt(e.target.dataset.row) + 1;
        const y = parseInt(e.target.dataset.column) + 1;
        const coords = [x, y];

        computerPlayer.attackTheShip(coords);
        displayGameBoard("computer-board", computerPlayer.getGameBoard(), playRound);

        if (computerPlayer.checkWinner()) 
            displayWinner("Player");

        isPlayerTurn = false;
        setTimeout(() => { computerAttack(); }, 1000);
    };

    const computerAttack = () => {
        const coords = computerPlayer.generateComputerAttack();
        humanPlayer.attackTheShip(coords);
        displayGameBoard("player-board", humanPlayer.getGameBoard());
        if (humanPlayer.checkWinner()) 
            displayWinner("Computer");
        isPlayerTurn = true;
    }

    const start = () => {
        displayGameBoard("player-board", humanPlayer.getGameBoard());
        displayGameBoard("computer-board", computerPlayer.getGameBoard(), playRound);
    };

    return { start };
}
