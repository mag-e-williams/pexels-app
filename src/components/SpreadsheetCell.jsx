import React, {useState} from 'react'

export default function SpreadsheetCell({onChange, evalCell, cell, row, col, type}) {
  const [focus, setFocus] = useState(false)
  const [isField, setisField] = useState(type =='spreadsheet-field')

  return (
    <input
      type="text"
      className={['spreadsheet-cell', type].join(' ')}
      disabled={type == "spreadsheet-header"}
      value={!focus && isField ? evalCell(cell) : cell}
      onChange={(e) => onChange(e.target.value, row, col)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
    </input>
  )
}