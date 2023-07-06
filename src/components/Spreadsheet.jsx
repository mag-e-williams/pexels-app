import React, { ChangeEvent } from 'react'
import {useState} from 'react'


const ROWS = 20;
const COLS = 20;

const makeGrid = () => {
  return Array(ROWS).fill(0).map(e => {
    return (
      Array(COLS).fill('')
    )
  })
}

function Cell({onChange, cell, row, col}) {
  
  return (
    <input
      type="text"
      className="spreadsheet-field"
      value={cell}
      onChange={(e) => onChange(e.target.value, row, col)}
    >
    </input>
  )
}

export default function Spreadsheet() {
  const [grid, setGrid] = useState(makeGrid())

  function handleCellEval(row, col) {
    const val = grid[row][col]
    if (val[0] == '=') {
      const newGrid = [...grid];
      newGrid[row][col] = eval(val.slice(1));
      setGrid([...newGrid]);
    }
  }
  function evalCell(val) {
    if (val[0] == '=') {
      return eval(val.slice(1));
    } 
    return val
  } 


  function handleCellUpdate(val, row, col) {
    const newGrid = [...grid]
    newGrid[row][col] = val
    setGrid([...newGrid])
  }

  return (
    <div className="app">
      {grid.map((row, row_i) => {
        return (
          <div className='row' key={row_i}>
            {row.map((cell_val, col_i) => {
              let focus = false;
              const displayedVal = evalCell(cell_val);
              return (
                <Cell
                  key={col_i} 
                  onChange={handleCellUpdate} 
                  cell={cell_val} 
                  row={row_i} 
                  col={col_i}
                />
              )
            })}
          </div>
        )
      } )}
    </div>
  )
}


