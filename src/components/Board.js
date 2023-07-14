import React, { useState, useEffect } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";
import Timer from "./Timer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Board = () => {
    const [grid, setGrid] = useState([]);
    const [nonMineCount, setNonMineCount] = useState(0);
    const [mineLocations, setMineLocations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [row, setRow] = useState(15);
    const [col, setCol] = useState(15);
    const [bombs, setBombs] = useState(20);

    const getRowSize = () => {
        // divide by the max value of the slider
        return { backgroundSize: `${(row * 100) / 30}% 100%` }
    }
    const getColSize = () => {
        // divide by the max value of the slider
        return { backgroundSize: `${(col * 100) / 30}% 100%` }
    }
    const getBombSize = () => {
        // divide by the max value of the slider
        return { backgroundSize: `${(bombs * 100) / 90}% 100%` }
    }

    // ComponentDidMount
    useEffect(() => {
        // Creating a board

        // Calling the function
        freshBoard();
    }, []);

    const freshBoard = () => {
        // change fixed values to slider values
        const newBoard = createBoard(row, col, bombs);
        setNonMineCount(row * col - bombs);
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
                let newRevealedBoard = revealed(newGrid, x, y, nonMineCount, flag, row, col);
                console.log(newRevealedBoard)
                setGrid(newRevealedBoard.arr);
                setNonMineCount(newRevealedBoard.newNonMinesCount);
                if (newRevealedBoard.newNonMinesCount === 0) {
                    setGameOver(true);
                    toast.success('Congratulations! You won the game!');
                }
                else if (newRevealedBoard.flag === true) {
                    setGameOver(true);
                    toast.error('Game Over! Mine exploded...');
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
            toast.error('Game Over! Mine exploded...');
        } else {
            let newRevealedBoard = revealed(newGrid, x, y, nonMineCount, false, row, col);
            console.log(newRevealedBoard)
            setGrid(newRevealedBoard.arr);
            setNonMineCount(newRevealedBoard.newNonMinesCount);
            if (newRevealedBoard.newNonMinesCount === 0) {
                setGameOver(true);
                toast.success('Congratulations! You won the game!');
            }
        }
    };

    return (
        <div>
            <ToastContainer position="top-center" />
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
            <div>
                <button className="myButton" onClick={freshBoard}>Refresh</button>
            </div>
            <div className="container">
                <div>
                    <label>Rows: {row}</label>
                    <input
                        max={30}
                        type="range"
                        value={row}
                        onChange={(e) => setRow(e.target.valueAsNumber)}
                        style={getRowSize()}
                    />
                </div>
                <div>
                    <label>Columns: {col}</label>
                    <input
                        max={30}
                        type="range"
                        value={col}
                        onChange={(e) => setCol(e.target.valueAsNumber)}
                        style={getColSize()}
                    />
                </div>
                <div>
                    <label>Bombs: {bombs}</label>
                    <input
                        max={90}
                        type="range"
                        value={bombs}
                        onChange={(e) => setBombs(e.target.valueAsNumber)}
                        style={getBombSize()}
                    />
                </div>
            </div>

        </div>
    );
};

export default Board;