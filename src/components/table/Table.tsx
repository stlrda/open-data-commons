import React from 'react';
import { Table as BPTable, Column, Cell } from '@blueprintjs/table';
import { IMenuContext, TableLoadingOption } from '@blueprintjs/table'
// import { JSONFormat } from '@blueprintjs/table'

export interface IColumn {
  name: string
  // items: any
}

interface TableProps {
  numRows: number
  columns: IColumn[]
  loadingRows?: boolean
}

const Table: React.FC<TableProps> = ({
  numRows,
  columns,
  loadingRows = false,
}) => {
  const cellRenderer = (rowIndex: number) => <Cell>{rowIndex}</Cell>;
  // const cellRendererJSON = (rowIndex: number) => <Cell><JSONFormat>{{"index": rowIndex, "yessir": true}}</JSONFormat></Cell>;

  const handleRightClick = (context: IMenuContext) => {
    console.log('context passed on right click:', context)
    return (
      <div>hello</div>
    )
  }

  const handleCellClipboardData = (row: number, col: number) => {
    console.log('copied on row:', row, 'and col:', col)
  }

  const getTableLoadingStates = () => {
    let tableLoadingStates: TableLoadingOption[] = []

    if(loadingRows)
      tableLoadingStates.push(TableLoadingOption.CELLS)

    return tableLoadingStates
  }

  return (
    <BPTable
      numRows={numRows}
      bodyContextMenuRenderer={(context) => handleRightClick(context)}
      getCellClipboardData={(row, col) => handleCellClipboardData(row, col)}
      loadingOptions={getTableLoadingStates()}
    >
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
