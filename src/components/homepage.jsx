import React from 'react';
import { Spreadsheet } from './Spreadsheet';

const ROWS = 30;
const COLS = 80;

export function Homepage() {
  return (
    <Spreadsheet rows={ROWS} cols={COLS}/>
  );
}
