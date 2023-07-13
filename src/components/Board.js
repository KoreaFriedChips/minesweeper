import React, { useState, useEffect } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";
import Timer from "./Timer";

const Board = ({ row, col, bomb }) => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    // ComponentDidMount
    useEffect(() => {
        // Creating a board

        // Calling the function
        freshBoard();
    }, []);

    const freshBoard = () => {
        // change fixed values to slider values
        const newBoard = createBoard(row, col, bomb);
        setNonMineCount(row * col - bomb);
        setMineLocations(newBoard.mineLocation);
        setGrid(newBoard.board);
    };

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
    };

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // to not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newGrid = JSON.parse(JSON.stringify(grid));
        console.log(newGrid[x][y]);
        console.log(newGrid[x][y].value)
        // if right click on revealed block, count number of bombs around
        // if correct number of bombs, reveal all other blocks around it
        // if a revealed block is a bomb, game over
        if (newGrid[x][y].revealed === true) {
            let cnt = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (x + i >= row || x + i < 0 || y + j >= col || y + j < 0)
                        continue;
                    if (newGrid[x + i][y + j].flagged)
                        cnt++;
                }
            }
            console.log(cnt)
            if (cnt === newGrid[x][y].value) {
                let flag = false
                let newRevealedBoard = revealed(newGrid, x, y, nonMineCount, flag);
                console.log(newRevealedBoard)
                setGrid(newRevealedBoard.arr);
                setNonMineCount(newRevealedBoard.newNonMinesCount);
                // later change to distinguish between win and lose
                if (newRevealedBoard.newNonMinesCount === 0 || newRevealedBoard.flag === true) {
                    setGameOver(true);
                    console.log(gameOver)
                }
            }
        }
        // else flag the cell and update
        else if (!newGrid[x][y].flagged) {
            newGrid[x][y].flagged = true;
            setGrid(newGrid);
        }
        else if (newGrid[x][y].flagged) {
            newGrid[x][y].flagged = false;
            setGrid(newGrid);
        }
    };

    // Reveal Cell
    const revealCell = (x, y) => {
        if (grid[x][y].revealed || gameOver) {
            return;
        }
        let newGrid = JSON.parse(JSON.stringify(grid));
        if (newGrid[x][y].value === "X") {
            for (let i = 0; i < mineLocations.length; i++) {
                newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
            }
            setGrid(newGrid);
            setGameOver(true);
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
            console.log(newRevealedBoard)
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount);
            if (newRevealedBoard.newNonMinesCount === 0) {
                setGameOver(true);
            }
        }
    };

    return (
        <div>
            {/* <p>Minesweeper</p> */}
            {/* <Timer gameOver={gameOver} /> */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                {gameOver && <Modal restartGame={restartGame} />}
                {grid.map((singleRow, index1) => {
                    return (
                        <div style={{ display: "flex" }} key={index1}>
                            {singleRow.map((singleBlock, index2) => {
                                return (
                                    <Cell
                                        revealCell={revealCell}
                                        details={singleBlock}
                                        updateFlag={updateFlag}
                                        key={index2}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Board;