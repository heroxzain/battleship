export default function newShips(playerShips, updateShipsCallback, validateCallback) {
    const board = document.querySelector("#player-board");
    let grabbedSegmentIndex = 0;
    let draggedShipIndex = null;

    const clearHighlights = () => {
        const highlighted = board.querySelectorAll('.hover-valid, .hover-invalid');
        highlighted.forEach(cell => {
            cell.classList.remove('hover-valid', 'hover-invalid');
        });
    };

    board.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('ship')) {
            draggedShipIndex = parseInt(e.target.dataset.index);
            const ship = playerShips[draggedShipIndex];
            
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
        e.dataTransfer.setData("shipIndex", draggedShipIndex);
        e.dataTransfer.setData("grabOffset", grabbedSegmentIndex);
        e.dataTransfer.effectAllowed = "move";
    });

    board.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (e.target.dataset.row === undefined) return;

        clearHighlights();

        const hoverRow = parseInt(e.target.dataset.row);
        const hoverCol = parseInt(e.target.dataset.column);
        const ship = playerShips[draggedShipIndex];

        let newX = ship.axis === 'y' ? hoverRow - grabbedSegmentIndex + 1 : hoverRow + 1;
        let newY = ship.axis === 'x' ? hoverCol - grabbedSegmentIndex + 1 : hoverCol + 1;

        const mockShip = { coords: [newX, newY], length: ship.length, axis: ship.axis };
        
        const isValid = validateCallback(mockShip, playerShips, draggedShipIndex);
        
        const previewClass = isValid ? 'hover-valid' : 'hover-invalid';

        for (let i = 0; i < ship.length; i++) {
            const targetRow = ship.axis === 'y' ? (newX - 1) + i : (newX - 1);
            const targetCol = ship.axis === 'x' ? (newY - 1) + i : (newY - 1);
            
            const cell = document.querySelector(`#player-board [data-row="${targetRow}"][data-column="${targetCol}"]`);
            if (cell) cell.classList.add(previewClass);
        }
    });

    board.addEventListener('dragleave', (e) => {
        if (!board.contains(e.relatedTarget)) {
            clearHighlights();
        }
    });

    board.addEventListener('drop', (e) => {
        e.preventDefault();
        clearHighlights();
        
        const shipIndex = parseInt(e.dataTransfer.getData("shipIndex"));
        const offset = parseInt(e.dataTransfer.getData("grabOffset"));
        
        const dropRow = parseInt(e.target.dataset.row);
        const dropCol = parseInt(e.target.dataset.column);
        const ship = playerShips[shipIndex];

        let newX = ship.axis === 'y' ? dropRow - offset + 1 : dropRow + 1;
        let newY = ship.axis === 'x' ? dropCol - offset + 1 : dropCol + 1;

        updateShipsCallback([newX, newY], shipIndex);
        draggedShipIndex = null;
    });
}
