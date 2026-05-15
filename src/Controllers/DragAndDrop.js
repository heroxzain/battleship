export default function newShips(getPlayerShips, updateShipsCallback, validateCallback) {
    const board = document.querySelector("#player-board");
    let grabbedSegmentIndex = 0;
    let draggedShipIndex = null;
    let isEnabled = true; 

    const clearHighlights = () => {
        const highlighted = board.querySelectorAll('.hover-valid, .hover-invalid');
        highlighted.forEach(cell => {
            cell.classList.remove('hover-valid', 'hover-invalid');
        });
    };

    function mouseDown(e) {
        if (!isEnabled) return;
        if (e.target.classList.contains('ship')) {
            draggedShipIndex = parseInt(e.target.dataset.index);
            const ship = getPlayerShips()[draggedShipIndex];
            
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
    }

    function dragStart(e) {
        if (!isEnabled) { e.preventDefault(); return; }
        e.dataTransfer.setData("shipIndex", draggedShipIndex);
        e.dataTransfer.setData("grabOffset", grabbedSegmentIndex);
        e.dataTransfer.effectAllowed = "move";
    }

    function dragOver(e) {
        if (!isEnabled) return;
        e.preventDefault();
        if (e.target.dataset.row === undefined) return;

        clearHighlights();

        const hoverRow = parseInt(e.target.dataset.row);
        const hoverCol = parseInt(e.target.dataset.column);
        const ship = getPlayerShips()[draggedShipIndex];

        let newX = ship.axis === 'y' ? hoverRow - grabbedSegmentIndex + 1 : hoverRow + 1;
        let newY = ship.axis === 'x' ? hoverCol - grabbedSegmentIndex + 1 : hoverCol + 1;

        const mockShip = { coords: [newX, newY], length: ship.length, axis: ship.axis };
        const isValid = validateCallback(mockShip, getPlayerShips(), draggedShipIndex);
        const previewClass = isValid ? 'hover-valid' : 'hover-invalid';

        for (let i = 0; i < ship.length; i++) {
            const targetRow = ship.axis === 'y' ? (newX - 1) + i : (newX - 1);
            const targetCol = ship.axis === 'x' ? (newY - 1) + i : (newY - 1);
            
            const cell = document.querySelector(`#player-board [data-row="${targetRow}"][data-column="${targetCol}"]`);
            if (cell) cell.classList.add(previewClass);
        }
    }

    function dragLeave(e) {
        if (!isEnabled) return;
        if (!board.contains(e.relatedTarget)) {
            clearHighlights();
        }
    }

    function drop(e) {
        if (!isEnabled) return;
        e.preventDefault();
        clearHighlights();
        
        const shipIndex = parseInt(e.dataTransfer.getData("shipIndex"));
        const offset = parseInt(e.dataTransfer.getData("grabOffset"));
        
        const dropRow = parseInt(e.target.dataset.row);
        const dropCol = parseInt(e.target.dataset.column);
        const ship = getPlayerShips()[shipIndex];

        let newX = ship.axis === 'y' ? dropRow - offset + 1 : dropRow + 1;
        let newY = ship.axis === 'x' ? dropCol - offset + 1 : dropCol + 1;

        updateShipsCallback([newX, newY], shipIndex, ship.axis);
        draggedShipIndex = null;
    }

    function click(e) {
        if (!isEnabled) return;
        if (e.target.classList.contains('ship')) {
            const index = parseInt(e.target.dataset.index);
            const ship = getPlayerShips()[index];
            ship.axis = ship.axis === "x" ? "y" : "x";
            updateShipsCallback(ship.coords, index, ship.axis); 
        }
    }

    board.addEventListener('mousedown', mouseDown);
    board.addEventListener('dragstart', dragStart);
    board.addEventListener('dragover', dragOver);
    board.addEventListener('dragleave', dragLeave);
    board.addEventListener('drop', drop);
    board.addEventListener("click", click);

    return {
        enable: () => isEnabled = true,
        disable: () => {
            isEnabled = false;
            clearHighlights();
        }
    };
}
