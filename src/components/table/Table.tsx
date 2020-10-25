import React from 'react';
import { Table as BPTable, Column, Cell } from '@blueprintjs/table';

export interface IColumn {
  name: string
  // items: any
}

interface TableProps {
  numRows: number
  columns: IColumn[]
}

const Table: React.FC<TableProps> = ({
  numRows,
  columns,
}) => {
  const cellRenderer = (rowIndex: number) => <Cell>{rowIndex}</Cell>;

  return (
    <BPTable numRows={numRows}>
      {columns.map((column, index) => (
        <Column
          key={index}
          name={column.name}
          cellRenderer={cellRenderer}
        />
      ))}
    </BPTable>
  );
};

export default Table;
