import React, { useState, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'

export default () => {
  const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ])
  const [columnDefs] = useState([{ field: 'make' }, { field: 'model' }, { field: 'price' }])
  const sideBar = useMemo(
    () => ({
      toolPanels: ['filters', 'columns']
    }),
    []
  )
  const statusBar = useMemo(
    () => ({
      statusPanels: [{ statusPanel: 'agTotalAndFilteredRowCountComponent' }]
    }),
    []
  )
  const rowBuffer = 0
  const rowSelection = 'multiple'
  const animateRows = true

  /**
   * It makes sense to use useState if your application intends changing Column Definitions and to use useMemo if your
   * application does not change Column Definitions.
   * const columnDefs = useMemo(() => [{ field: 'make' }, { field: 'model' }, { field: 'price' }], [])
   */

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        sideBar={sideBar}
        statusBar={statusBar}
        // variables assigned, no hooks, properties only set once
        rowBuffer={rowBuffer}
        rowSelection={rowSelection}
        animateRows={animateRows}
        // inline also works well, properties only set once
        rowModelType="clientSide"
        rowHeight="50"
      />
    </div>
  )
}
