import React from 'react';
import { Table as BPTable, Column, Cell } from '@blueprintjs/table';
import { IMenuContext, TableLoadingOption } from '@blueprintjs/table'
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
  columns: any[] // method.responses[]
  loadingRows?: boolean
}

const Table: React.FC<TableProps> = ({
  numRows,
  columns,
  loadingRows = false,
}) => {
  // region will be either IRegion[] if selection or single IRegion if just the cell
  const handleRightClick = (context: IMenuContext) => {
    console.log('context passed on right click:', context)
    return (
      <div style={{backgroundColor: "#fff", minWidth: 90, textAlign: 'center'}}>
        <p onClick={() => handleTableCopy(context)} style={{padding: 5, margin: 0, borderBottom: "1px solid rgba(66,66,66,.16)", cursor: 'pointer'}}>Copy</p>
        <p onClick={() => handleTableCut(context)} style={{padding: 5, margin: 0, borderBottom: "1px solid rgba(66,66,66,.16)", cursor: 'pointer'}}>Cut</p>
        <p onClick={() => handleTablePaste(context)} style={{padding: 5, margin: 0, borderBottom: "1px solid rgba(66,66,66,.16)", cursor: 'pointer'}}>Paste</p>
        <p onClick={() => handleTableDelete(context)} style={{padding: 5, margin: 0, cursor: 'pointer'}}>Delete</p>
      </div>
    )
  }

  const handleTableCopy = (context: IMenuContext) => {
    console.log('clicked copy option for table')
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

  const getTableLoadingStates = () => {
    let tableLoadingStates: TableLoadingOption[] = []

    if(loadingRows)
      tableLoadingStates.push(TableLoadingOption.CELLS)

    return tableLoadingStates
  }

  const generateDummyData = (datatype: NonArraySchemaObjectType | ArraySchemaObjectType) => { // make bool
    switch(datatype) {
      case "string":
        return "string";
      case "number": case "integer":
        return 0
      case "boolean":
        return true;
      case "object":
        return JSON.stringify({ first: "input", second: "input" })
      case "array":
        return ["array", "of", "items"].toString()
      default:
        return "";
    }
  }

  const cellRenderer = (colIndex: number, type: NonArraySchemaObjectType | ArraySchemaObjectType) => {
    return (
      <Cell>{generateDummyData(type)}</Cell>
    )
  }

  // const cellRendererJSON = (rowIndex: number) => <Cell><JSONFormat>{{"index": rowIndex, "yessir": true}}</JSONFormat></Cell>;
  if(!columns || columns.length < 1) {
    return (
      <div>
        <p>No responses found for this request</p>
      </div>
    )
  }
  return (
    <BPTable
      numRows={1}
      bodyContextMenuRenderer={(context) => handleRightClick(context)}
      getCellClipboardData={(row, col) => handleCellClipboardData(row, col)}
      // loadingOptions={getTableLoadingStates()}
    >
      {/* <Column
          key={1}
          name={column}
          cellRenderer={(row, col) => cellRenderer(col)}
        /> */}
      {columns && Object.keys(columns).map((columnKey, index) => (
        <Column
          key={index}
          //@ts-ignore
          name={columns[columnKey].name}
          //@ts-ignore
          cellRenderer={(row, col) => cellRenderer(col, columns[columnKey].type)}
        />
      ))}
    </BPTable>
  );
};

export default Table;
