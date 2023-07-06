import React, {useState} from 'react'
import SpreadsheetCell from './SpreadsheetCell'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const makeCols = (cols) => {
  return Array(cols + 1).fill(0).map((e, i) => {
    if (i == 0) return ''
    const col_i = i-1
    const a1 = Math.floor(col_i/ALPHABET.length - 1)
    const a2 = col_i % ALPHABET.length 

    if (a1 >= 0) {
      return [ALPHABET[a1], ALPHABET[a2]].join('')
    }
    return ALPHABET[a2]
  })
}

const makeGrid = (rows, cols) => {
  return Array(rows).fill(0).map(e => {
    return (
      Array(cols).fill('')
    )
  })
}

export function Spreadsheet({rows, cols}) {
  const [grid, setGrid] = useState(makeGrid(rows, cols))
  const [colArray, setColArray] = useState(makeCols(cols))
  console.log(colArray)
  function handleCellUpdate(val, row, col) {
    const newGrid = [...grid]
    newGrid[row][col] = val
    setGrid([...newGrid])
  }

  return (
    <div className='app'>
      <div className='spreadsheet-row' >
        {colArray.map((col) => (
          <SpreadsheetCell
            type="spreadsheet-header"
            key={col} 
            cell={col} 
          />
        ))}
      </div>

      <div className='spreadsheet-body'>  
        {grid.map((row, row_i) => (
          <div className='spreadsheet-row' key={row_i}>
            <SpreadsheetCell
              type="spreadsheet-header"
              key={row_i + 1} 
              cell={row_i + 1} 
            />

            {row.map((cell_val, col_i) => {
              return (
                <SpreadsheetCell
                  type="spreadsheet-field"
                  key={col_i} 
                  onChange={handleCellUpdate} 
                  cell={cell_val} 
                  row={row_i} 
                  col={col_i}
                />
              )
            })}
          </div>
        ))}
      </div>

    </div>
  )
}


