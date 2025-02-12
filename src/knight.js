const typesOfMoves = [
    [-2, 1],
    [-2, -1],
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-1, -2],
    [-1, 2]
];

function isValid(x, y) {
    //check if position is within the confines of a chessboard
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function printPath(path) {
    console.log(`You made it in ${path.length -1} moves! Here's your path: `);
    for(let move of path) {
        console.log(`${move}`);
    }
}

function knightMoves([startX, startY], [endX, endY]) {
    if(!isValid(startX, startY)) {
        console.log('The coordinates for the starting position are invalid.')
    } else if (!isValid(endX, endY)) {
        console.log('The coordinates for the ending position are invalid.')
    }

    let queue = [[startX, startY, [[startX, startY]]]];

    let visited = [];
    for(let i = 0; i < 8; i++) {
        visited[i] = [];
        for(let j = 0; j < 8; j++) {
            visited[i][j] = false;
        }
    }

    visited[startX][startY] = true;

    while(queue.length > 0) {
        let current = queue.shift();
        let currentX = current[0];
        let currentY = current[1];
        let currentPath = current[2];

        if(currentX === endX && currentY == endY) {
            printPath(currentPath);
            return;
        }

        for(let [dx, dy] of typesOfMoves) {
            let newX = currentX + dx;
            let newY = currentY + dy;

            if(isValid(newX, newY) && !visited[newX][newY]) {
                visited[newX][newY] = true;
                

                let newPath = [];
                for(let i = 0; i < currentPath.length; i++) {
                    newPath.push(currentPath[i]);
                }
                newPath.push([newX, newY]);

                queue.push([newX, newY, newPath]);
            }
        }
    }
    console.log('Path not found.');
}

export { knightMoves };