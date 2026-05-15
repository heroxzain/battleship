export default function newShips(playerShips, updateShipsCallback) {
    const board = document.querySelector("#player-board");
    let grabbedSegmentIndex = 0;

    board.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('ship')) {
            const shipIndex = parseInt(e.target.dataset.index);
            const ship = playerShips[shipIndex];
            
            const clickedRow = parseInt(e.target.dataset.row);
            const clickedCol = parseInt(e.target.dataset.column);
            
            const originRow = ship.coords[0] - 1;
            const originCol = ship.coords[1] - 1;

            if (ship.axis === 'y') {
                grabbedSegmentIndex = clickedRow - originRow;
            } else {
                grabbedSegmentIndex = clickedCol - originCol;
            }
        }
    });

    board.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("shipIndex", e.target.dataset.index);
        e.dataTransfer.setData("grabOffset", grabbedSegmentIndex);
        e.dataTransfer.effectAllowed = "move";
    });

    board.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    board.addEventListener('drop', (e) => {
        e.preventDefault();
        const shipIndex = parseInt(e.dataTransfer.getData("shipIndex"));
        const offset = parseInt(e.dataTransfer.getData("grabOffset"));
        
        const dropRow = parseInt(e.target.dataset.row);
        const dropCol = parseInt(e.target.dataset.column);
        const ship = playerShips[shipIndex];

        let newX = ship.axis === 'y' ? dropRow - offset + 1 : dropRow + 1;
        let newY = ship.axis === 'x' ? dropCol - offset + 1 : dropCol + 1;

        updateShipsCallback([newX, newY], shipIndex);
    });
}