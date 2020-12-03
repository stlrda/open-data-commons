import React from 'react'
import { Dialog, Classes, Spinner } from '@blueprintjs/core'
import Table from '../table/Table'
import { ODCTable } from '../../services/OpenapiFormatter'

interface Props {
  showModal: boolean
  responseTable?: ODCTable
  onCloseModal: () => void
}

const FullscreenTable: React.FC<Props> = ({
  showModal,
  responseTable,
  onCloseModal,
}) => {

  return (
    <Dialog
      isOpen={showModal}
      className=""
      style={{width: "90%", height: "95vh", margin: "auto"}}
      icon="th-list"
      onClose={onCloseModal}
      title="Fullscreen Table"
      autoFocus
      canEscapeKeyClose
      canOutsideClickClose
      enforceFocus
      lazy
      usePortal
      // portalContainer
    >
      <div className={Classes.DIALOG_BODY}>
        {/* Toolbar Here: */}
        <div className="table-toolbar">

        </div>

        <div className="table-container" style={{
          // height: `calc(22px * ${responseTables[modalTableIndex].rows.length < maxVisibleCells ? table.rows.length : maxVisibleCells} + 40px)`, // props.cellHeight * props.maxVisibleCells
          height: `calc(95vh - 40px - 40px)`, // 40px margin, 40px header height
          // height: "auto",
          overflowY: "auto"
        }}>
          {responseTable ? (
            <Table
              numRows={responseTable.rows.length}
              columns={responseTable.columns}
              rows={responseTable.rows}
            />
          ) : (
            // Loading Indicator
            <Spinner />
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default FullscreenTable
