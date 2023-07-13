import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useState } from 'react';

function App() {


  return (
    <div className="App">
      <h1> Minesweeper </h1>
      <Board />
      <div>
        <h1>Instructions</h1>
        <p>1. Left Click on an empty cell to reveal the cell</p>
        <p>2. Right Click on an empty cell to flag the cell</p>
        <p>3. Right Click on a number when the number flags around it corresponds to the value to reveal cells around it</p>
        <p>4. This is a 10 x 15 grid with 15 bombs (custom grid size/bombs coming soon)</p>
        <p>5. Have fun!</p>
      </div>
    </div>
  );
}

export default App;
