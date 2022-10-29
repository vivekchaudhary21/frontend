import React, { useState, useRef, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'

export default () => {
  return (
    <div className="ag-theme-alpine" style={{ height: '100vh' }}>
      <GridExampleAddingRemovingColumn />
      <GridExampleColumnEvents />
    </div>
  )
}

const GridExampleAddingRemovingColumn = () => {
  const columnDefsMedalsIncluded = [
    { field: 'athlete' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' }
  ]

  const colDefsMedalsExcluded = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' }
  ]

  const gridRef = useRef()
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState(columnDefsMedalsIncluded)
  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 100,
      sortable: true,
      resizable: true
    }
  }, [])
  const onGridReady = useCallback(params => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => setRowData(data))
  }, [])

  return (
    <>
      <button
        onClick={() => {
          gridRef.current.api.setColumnDefs(columnDefsMedalsIncluded)
        }}
      >
        Medals Included
      </button>
      <button
        onClick={() => {
          gridRef.current.api.setColumnDefs(colDefsMedalsExcluded)
        }}
      >
        Medals Excluded
      </button>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        maintainColumnOrder={true}
      />
    </>
  )
}

const GridExampleColumnEvents = () => {
  const getColumnDefs = () => {
    return [
      { field: 'athlete' },
      { field: 'age' },
      { field: 'country' },
      { field: 'sport' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' }
    ]
  }

  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100vw', height: '100vh' }), [])
  const gridStyle = useMemo(() => ({ height: '100vh', width: '100vw' }), [])
  const [rowData, setRowData] = useState()
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      width: 150,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true
    }
  }, [])
  const [columnDefs, setColumnDefs] = useState(getColumnDefs())

  const onGridReady = useCallback(params => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => setRowData(data))
  }, [])

  const onSortChanged = useCallback(e => {
    console.log('Event Sort Changed', e)
  }, [])

  const onColumnResized = useCallback(e => {
    console.log('Event Column Resized', e)
  }, [])

  const onColumnVisible = useCallback(e => {
    console.log('Event Column Visible', e)
  }, [])

  const onColumnPivotChanged = useCallback(e => {
    console.log('Event Pivot Changed', e)
  }, [])

  const onColumnRowGroupChanged = useCallback(e => {
    console.log('Event Row Group Changed', e)
  }, [])

  const onColumnValueChanged = useCallback(e => {
    console.log('Event Value Changed', e)
  }, [])

  const onColumnMoved = useCallback(e => {
    console.log('Event Column Moved', e)
  }, [])

  const onColumnPinned = useCallback(e => {
    console.log('Event Column Pinned', e)
  }, [])

  const onBtSortOn = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'age') {
        colDef.sort = 'desc'
      }
      if (colDef.field === 'athlete') {
        colDef.sort = 'asc'
      }
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtSortOff = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      colDef.sort = null
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtWidthNarrow = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'age' || colDef.field === 'athlete') {
        colDef.width = 100
      }
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtWidthNormal = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      colDef.width = 200
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtHide = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'age' || colDef.field === 'athlete') {
        colDef.hide = true
      }
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtShow = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      colDef.hide = false
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtPivotOn = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(true)
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'country') {
        colDef.pivot = true
      }
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtPivotOff = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(false)
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      colDef.pivot = false
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtRowGroupOn = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'sport') {
        colDef.rowGroup = true
      }
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtRowGroupOff = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      colDef.rowGroup = false
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtAggFuncOn = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'gold' || colDef.field === 'silver' || colDef.field === 'bronze') {
        colDef.aggFunc = 'sum'
      }
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtAggFuncOff = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      colDef.aggFunc = null
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtPinnedOn = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'athlete') {
        colDef.pinned = 'left'
      }
      if (colDef.field === 'age') {
        colDef.pinned = 'right'
      }
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  const onBtPinnedOff = useCallback(() => {
    const columnDefs = getColumnDefs()
    columnDefs.forEach(function (colDef) {
      colDef.pinned = null
    })
    gridRef.current.api.setColumnDefs(columnDefs)
  }, [])

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <div className="test-button-row">
            <div className="test-button-group">
              <button onClick={onBtSortOn}>Sort On</button>
              <br />
              <button onClick={onBtSortOff}>Sort Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtWidthNarrow}>Width Narrow</button>
              <br />
              <button onClick={onBtWidthNormal}>Width Normal</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtHide}>Hide Cols</button>
              <br />
              <button onClick={onBtShow}>Show Cols</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtPivotOn}>Pivot On</button>
              <br />
              <button onClick={onBtPivotOff}>Pivot Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtRowGroupOn}>Row Group On</button>
              <br />
              <button onClick={onBtRowGroupOff}>Row Group Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtAggFuncOn}>Agg Func On</button>
              <br />
              <button onClick={onBtAggFuncOff}>Agg Func Off</button>
            </div>
            <div className="test-button-group">
              <button onClick={onBtPinnedOn}>Pinned On</button>
              <br />
              <button onClick={onBtPinnedOff}>Pinned Off</button>
            </div>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            onSortChanged={onSortChanged}
            onColumnResized={onColumnResized}
            onColumnVisible={onColumnVisible}
            onColumnPivotChanged={onColumnPivotChanged}
            onColumnRowGroupChanged={onColumnRowGroupChanged}
            onColumnValueChanged={onColumnValueChanged}
            onColumnMoved={onColumnMoved}
            onColumnPinned={onColumnPinned}
          ></AgGridReact>
        </div>
      </div>
    </div>
  )
}
