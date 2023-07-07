import React from 'react';
import { Spreadsheet } from './Spreadsheet';

const ROWS = 20;
const COLS = 10;

export function Homepage() {
  return (
    <div className="app">
      <Spreadsheet rows={ROWS} cols={COLS}/>
    </div>
  );
}
