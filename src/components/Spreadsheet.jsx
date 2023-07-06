import React, {useState} from 'react'

const makeGrid = (rows, cols) => {
  return Array(rows).fill(0).map(e => {
    return (
      Array(cols).fill('')
    )
  })
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function Cell({onChange, evalCell, cell, row, col, isField}) {
  const [focus, setFocus] = useState(false)

  return (
    <input
      type="text"
      className="spreadsheet-field"
      value={!focus && isField ? evalCell(cell) : cell}
      onChange={(e) => onChange(e.target.value, row, col)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
    </input>
  )
}

export function Spreadsheet({rows, cols}) {
  const [grid, setGrid] = useState(makeGrid(rows, cols))

  function handleCellUpdate(val, row, col) {
    const newGrid = [...grid]
    newGrid[row][col] = val
    setGrid([...newGrid])
  }

  function evalCell(val) {
    if (val[0] == '=') {
      return eval(val.slice(1));
    } 
    return val
  } 

  return (
    <div className="app">

      {grid.map((row, row_i) => {
        return (
          <div className='row' key={row_i}>
            {row.map((cell_val, col_i) => {
              return (
                <Cell
                  key={col_i} 
                  onChange={handleCellUpdate} 
                  evalCell={evalCell}
                  cell={cell_val} 
                  row={row_i} 
                  col={col_i}
                  isField={true}

                />
              )
            })}
          </div>
        )
      } )}
    </div>
  )
}


