export default function GenerateShips() {
    const visited = [];
    const finalShips = [];
    const roster = [5, 4, 3, 2, 2, 1, 1];

    const checkOffsets = [
        [0, 0],   // Center (actual ship cell)
        [-1, -1], [0, -1], [1, -1], // Top row
        [-1, 0],           [1, 0],  // Middle row sides
        [-1, 1],  [0, 1],  [1, 1]   // Bottom row
    ];

    roster.forEach(length => {
        let isPlaced = false;

        while (!isPlaced) {
            const axis = Math.random() > 0.5 ? "x" : "y";
            const startX = Math.floor(Math.random() * 10) + 1;
            const startY = Math.floor(Math.random() * 10) + 1;

            let proposedCoords = [];
            let isValid = true;

            for (let i = 0; i < length; i++) {
                let currentX = axis === "y" ? startX + i : startX;
                let currentY = axis === "x" ? startY + i : startY;

                if (currentX > 10 || currentY > 10) {
                    isValid = false;
                    break; 
                }

                for (const [dX, dY] of checkOffsets) {
                    const checkX = currentX + dX;
                    const checkY = currentY + dY;
                    
                    if (visited.includes(`${checkX},${checkY}`)) {
                        isValid = false;
                        break;
                    }
                }

                if (!isValid) break;

                proposedCoords.push([currentX, currentY]);
            }

            if (isValid) {
                proposedCoords.forEach(coord => visited.push(`${coord[0]},${coord[1]}`));
                
                finalShips.push({
                    coords: [startX, startY],
                    length: length,
                    axis: axis
                });

                isPlaced = true; 
            }
        }
    });

    return finalShips;
}
