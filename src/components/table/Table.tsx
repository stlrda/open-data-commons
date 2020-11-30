import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core'
import { Column, Cell, IMenuContext, TableLoadingOption, SelectionModes, CopyCellsMenuItem } from '@blueprintjs/table';
import { PatchedTable as BPTable } from './PatchedBPTable'
// import TableOperationsService from '../../services/TableOperations'
import { ODCTableColumn, ODCTableRow } from '../../services/OpenapiFormatter';
// import { JSONFormat } from '@blueprintjs/table'

type NonArraySchemaObjectType = 'boolean' | 'object' | 'number' | 'string' | 'integer';
type ArraySchemaObjectType = 'array';

// export interface IColumn {
//   name: string
//   // items: any
// }
export interface SchemaProperty {
  title: string
  type: NonArraySchemaObjectType | ArraySchemaObjectType
  format?: string // find enum for it
}

interface TableProps {
  numRows: number
  rows: ODCTableRow[]
  columns: {
    [name: string]: ODCTableColumn // method.responses[]
  }
  id?: string
  loadingRows?: boolean
}

const Table: React.FC<TableProps> = ({
  numRows,
  rows,
  columns,
  id,
  loadingRows = false,
}) => {
  // region will be either IRegion[] if selection or single IRegion if just the cell
  const handleRightClick = (context: IMenuContext) => {
    // console.log('context passed on right click:', context)
    return (
      <Menu>
        <CopyCellsMenuItem
          className="context-menu-item"
          context={context}
          getCellData={(row, col) => getCellData(row, col)}
          text="Copy"
          icon="duplicate"
        />
        <MenuItem
          className="context-menu-item"
          onClick={() => handleTableCut(context)}
          text="Cut"
          icon="cut"
        />
        <MenuItem
          className="context-menu-item"
          onClick={() => handleTablePaste(context)}
          text="Paste"
          icon="clipboard"
        />
        <MenuItem
          className="context-menu-item"
          onClick={() => handleTableDelete(context)}
          text="Delete"
          icon="trash"
        />
      </Menu>
    )
  }

  const getCellData = (rowIndex: number, colIndex: number) => {
    // for a given row and col, need to return the data at that row and column
    const columnKeys = Object.keys(columns);
    const colData = columnKeys[colIndex]
    return rows[rowIndex][colData]
  }

  const handleTableCut = (context: IMenuContext) => {
    console.log('clicked cut option for table')

  }

  const handleTablePaste = (context: IMenuContext) => {
    console.log('clicked paste option for table')
  }

  const handleTableDelete = (context: IMenuContext) => {
    console.log('clicked delete option for table')
  }

  const handleCellClipboardData = (row: number, col: number) => {
    console.log('copied on row:', row, 'and col:', col)
  }

  // const getTableLoadingStates = () => {
  //   let tableLoadingStates: TableLoadingOption[] = []

  //   if(loadingRows)
  //     tableLoadingStates.push(TableLoadingOption.CELLS)

  //   return tableLoadingStates
  // }

  const cellRenderer = (rowIndex: number, colIndex: number, key: string) => {
    // console.log('(cell renderer) row index:', rowIndex)
    const rowValue = rows[rowIndex][key];
    // console.log('row value:', rowValue)
    // console.log('rows:', rows[rowIndex])
    return (
      // Note: Can replace [key] with [colIndex] lookup if table rows are refactored to be array of arrays
      <Cell>{rowValue}</Cell>
    )
  }

  // const cellRendererJSON = (rowIndex: number) => <Cell><JSONFormat>{{"index": rowIndex, "yessir": true}}</JSONFormat></Cell>;
  if(!columns || Object.keys(columns).length < 1) {
    return (
      <div>
        <p>No responses found for this request</p>
      </div>
    )
  }
  return (
    <BPTable
      numRows={numRows}
      bodyContextMenuRenderer={(context) => handleRightClick(context)}
      getCellClipboardData={(row, col) => handleCellClipboardData(row, col)}
      selectionModes={SelectionModes.COLUMNS_AND_CELLS}
      // loadingOptions={getTableLoadingStates()}
    >
      {columns && Object.keys(columns).map((key, index) => (
        <Column
          key={key}
          nameRenderer={(name: string) => (
            columns[name].required
              ? <div>{name} <span style={{color:"red"}}>*</span></div>
              : <div>{name}</div>
          )}
          //@ts-ignore
          name={key} // OR columns[key].title
          //@ts-ignore
          cellRenderer={(row, col) => cellRenderer(row, col, key)}
        />
      ))}
    </BPTable>
  );
};

export default Table;
