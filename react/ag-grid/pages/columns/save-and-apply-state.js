import React, { useState, useRef, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'

export default () => {
  return (
    <div className="ag-theme-alpine" style={{ height: '100vh' }}>
      <GridExampleSaveApplyState />
    </div>
  )
}

const GridExampleSaveApplyState = () => {
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100vw', height: '100vh' }), [])
  const gridStyle = useMemo(() => ({ height: '100vh', width: '100vw' }), [])
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ])
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      width: 100,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true
    }
  }, [])
  const sideBar = useMemo(() => {
    return {
      toolPanels: ['columns']
    }
  }, [])

  const onGridReady = useCallback(params => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => setRowData(data))
  }, [])

  const saveState = useCallback(() => {
    window.colState = gridRef.current.columnApi.getColumnState()
    console.log('column state saved', window.colState)
  }, [])

  const restoreState = useCallback(() => {
    if (!window.colState) {
      console.log('no columns state to restore by, you must save state first')
      return
    }
    gridRef.current.columnApi.applyColumnState({
      state: window.colState,
      applyOrder: true
    })
    console.log('column state restored')
  }, [])

  const resetState = useCallback(() => {
    gridRef.current.columnApi.resetColumnState()
    console.log('column state reset')
  }, [])

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <div className="example-section">
            <button onClick={saveState}>Save State</button>
            <button onClick={restoreState}>Restore State</button>
            <button onClick={resetState}>Reset State</button>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  )
}
