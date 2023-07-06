import React, {useState} from 'react'

export default function SpreadsheetCell({onChange, cell, row, col, type}) {
  const [focus, setFocus] = useState(false)
  
  function evalCell(val) {
    if (val[0] == '=') {
      return eval(val.slice(1));
    } 
    return val
  } 

  return (
    <input
      type="text"
      className={['spreadsheet-cell', type].join(' ')}
      disabled={type == "spreadsheet-header"}
      value={!focus ? evalCell(cell) : cell}
      onChange={(e) => onChange(e.target.value, row, col)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
    </input>
  )
}