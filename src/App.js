import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useState } from 'react';

function App() {
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
    return { backgroundSize: `${(bombs * 100) / 50}% 100%` }
  }

  return (
    <div className="App">
      <h1> Minesweeper </h1>
      <Board row={row} col={col} bomb={bombs} />
      <div id='contianer'>
        <input max={30} type="range" value={row} onChange={(e) => setRow(e.target.valueAsNumber)} style={getRowSize()} />
        <input max={30} type="range" value={col} onChange={(e) => setCol(e.target.valueAsNumber)} style={getColSize()} />
        <input max={50} type="range" value={bombs} onChange={(e) => setBombs(e.target.valueAsNumber)} style={getBombSize()} />
      </div>
      <div>
        <button>Refresh</button>
      </div>
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
