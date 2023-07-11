export const revealed = (arr, x, y, newNonMinesCount, flag) => {
    console.log(arr[x][y]);

    if (arr[x][y].value !== 0 && arr[x][y].revealed === false) {
        arr[x][y].revealed = true;
        newNonMinesCount--;
    } else {

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // change fixed values to slider values
                if (x + i >= 10 || x + i < 0 || y + j >= 15 || y + j < 0 || (i === 0 && j === 0))
                    continue;
                if (arr[x + i][y + j].value !== "X" && arr[x + i][y + j].revealed === false) {
                    if (arr[x + i][y + j].value === 0) {
                        // bfs around the 0 block until no more zeros
                        const queue = [];
                        const visited = new Set();
                        queue.push([x + i, y + j]);
                        arr[x + i][y + j].revealed = true;
                        newNonMinesCount--;
                        visited.add([x + i, y + j]);
                        while (queue.length !== 0) {
                            const cur = queue.shift();
                            arr[cur[0]][cur[1]].revealed = true
                            //newNonMinesCount--;
                            console.log(cur);
                            for (let r = -1; r <= 1; r++) {
                                for (let c = -1; c <= 1; c++) {
                                    // change fixed values to slider values
                                    if (cur[0] + r >= 10 || cur[0] + r < 0 || cur[1] + c >= 15 || cur[1] + c < 0 || arr[cur[0] + r][cur[1] + c].revealed === true)
                                        continue;
                                    if (!visited.has([cur[0] + r, cur[1] + c])) {
                                        if (arr[cur[0] + r][cur[1] + c].value === 0) {
                                            queue.push([cur[0] + r, cur[1] + c])
                                        }
                                        arr[cur[0] + r][cur[1] + c].revealed = true;
                                        newNonMinesCount--;
                                        visited.add([cur[0] + r, cur[1] + c])
                                    }
                                }
                            }
                        }
                    } else {
                        arr[x + i][y + j].revealed = true;
                        newNonMinesCount--;
                    }
                }
                else if (arr[x + i][y + j].value === "X" && arr[x + i][y + j].flagged === false) {
                    arr[x + i][y + j].revealed = true;
                    flag = true
                }
            }
        }
    }

    return { arr, newNonMinesCount, flag };
};