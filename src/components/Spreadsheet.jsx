import React, {useState, useEffect, useCallback} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const makeCols = (cols) => {
  return Array(cols+1).fill(0).map((e, i) => {
    if (i==0) return ''

    const col_i = i-1
    const a1 = Math.floor((col_i)/ALPHABET.length) - 1
    const a2 = col_i % ALPHABET.length

    return {
      colName: a1 == 0 ? ALPHABET[a2] : [ALPHABET[a1], ALPHABET[a2]].join(''),
      col: i-1,
    }
  })
}

const makeGrid = (rows, cols) => {
  return Array(rows).fill(0).map(e => {
    return (
      Array(cols).fill('')
    )
  })
}


function SpreadsheetCell({isActive, isHeader, onChange, evalCell, cell, row, col, isField, setActiveCell, selectedStart, setSelectedStart, selectedEnd, setSelectedEnd, handleSelectedEnd}) {
  const [focus, setFocus] = useState(false)

  const getClasses = useCallback(() => {
    let classNames = []
    if (!isHeader) {
      classNames.push('field')
    }
    if (isActive) {
      classNames.push('active')
    } 
    return classNames.join(' ')
  }, [isActive, isHeader])

  const [classes, setClasses] = useState(getClasses())

  const handleCellClick = () => {
    setActiveCell([row, col])
  }

  const handleSelectStart = () => {
    setSelectedStart([row, col])
  }

  const handleSelectEnd = () => {
    setSelectedEnd([row, col])
    handleSelectedEnd(selectedStart, [row, col])
  }

  useEffect(() => {
    setClasses(getClasses())
  }, [isActive, getClasses]);

  return (
    <TableCell className={classes}>
      <input
        type="text"
        disabled={isHeader}
        className={'spreadsheet-field'}
        value={!focus && isField ? evalCell(cell) : cell}
        onChange={(e) => onChange(e.target.value, row, col)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseDown={() => handleSelectStart()}
        onMouseUp={() => handleSelectEnd()}
        onClick={() => handleCellClick()}
      >
      </input>
    </TableCell>
  )
}

export function Spreadsheet({rows, cols}) {
  // is active selection event
  const [activeCell, setActiveCell] = useState([0,0])
  // range of selected items
  const [selectedStart, setSelectedStart] = useState([])
  const [selectedEnd, setSelectedEnd] = useState([])
  const [colArray, setColArray] = useState(makeCols(cols))

  const [grid, setGrid] = useState(() => {
    if (typeof window !== 'undefined') {
      const cachedGrid = localStorage.getItem('grid');
      return cachedGrid ? JSON.parse(cachedGrid) : makeGrid(rows, cols);
    } 
    return makeGrid(rows, cols);
  });

  useEffect(() => {
    const cachedGrid = localStorage.getItem('grid');
    if (cachedGrid) {
      setGrid(JSON.parse(cachedGrid));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grid', JSON.stringify(grid));
  }, [grid]);

  function handleCellUpdate(val, row, col) {
    const newGrid = [...grid]
    newGrid[row][col] = val
    setGrid([...newGrid])
  }

  function evalCell(val) {
    if (val.startsWith('=')) {
      const formula = val.slice(1)
      const cellRefPattern = /([A-Z]+)(\d+)/g;
      const evaluatedFormula = formula.replace(cellRefPattern, (match, col, row) => {
        const row_i = row - 1
        const col_i = colArray.find(e => e.colName == col).col

        const referencedCell = grid[row_i][col_i]
        const referencedCellValue = evalCell(referencedCell)
        return String(referencedCellValue)
      })
      try {
       return eval(evaluatedFormula);
      } catch {
        return '#ERROR'
      }
    } 
    return val
  } 

  const handleSelectedEnd = (start, end) => {
    const startCellRow = start[0]
    const startCellCol = start[1]
    const endCellRow = end[0]

    const newGrid = [...grid]

    const startCellValue = newGrid[startCellRow][startCellCol]
    for (let i=startCellRow; i <= endCellRow; i++) {
      newGrid[i][startCellCol] = startCellValue
    }
    setGrid(newGrid)
  }

  // Arrow Key Navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      const moves = {'ArrowLeft': [0,-1], 'ArrowRight': [0,1], 'ArrowDown': [1,0], 'ArrowUp': [-1,0]}
      if (Object.keys(moves).includes(event.key)) {
        const [moveRow, moveCol] = moves[event.key]
        let [activePosRow, activePosCol] = activeCell
        activePosRow += moveRow
        activePosCol += moveCol
        if (activePosRow < 0) activePosRow = 0
        if (activePosCol < 0) activePosCol = 0

        setActiveCell([activePosRow, activePosCol])
      } 
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCell]);
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: '100vh' }}>
        <Table stickyHeader size={'small'} aria-label="sticky table">
          <TableHead>
          <TableRow>
            {colArray.map((col, col_i) => (
              <SpreadsheetCell
                isActive={col_i == activeCell[1] + 1}
                isHeader={true}
                key={col.col_i} 
                cell={col.colName} 
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {grid.map((row, row_i) => {
            return (
              <TableRow key={row_i}>
                <SpreadsheetCell
                isActive={row_i == activeCell[0]}
                isHeader={true}
                  cell={row_i+1} 
                />

                {row.map((cell_val, col_i) => {
                  return (
                    <SpreadsheetCell
                      isActive={row_i == activeCell[0] && col_i == activeCell[1]}

                      key={col_i} 
                      onChange={handleCellUpdate} 
                      evalCell={evalCell}
                      cell={cell_val} 
                      row={row_i} 
                      col={col_i}
                      isField={true}

                      activeCell={activeCell}
                      setActiveCell={setActiveCell}
    
                      selectedStart={selectedStart}
                      setSelectedStart={setSelectedStart}
                      
                      selectedEnd={selectedEnd}
                      setSelectedEnd={setSelectedEnd}
    
                      handleSelectedEnd={handleSelectedEnd}
                    />
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  )
}


