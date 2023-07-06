import React from 'react';
import { Spreadsheet } from './Spreadsheet';

const ROWS = 20;
const COLS = 40;

export function Homepage() {
  return (
    <Spreadsheet rows={ROWS} cols={COLS}/>
  );
}
