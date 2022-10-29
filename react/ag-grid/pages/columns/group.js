import React, { useState, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'

export default () => {
  return (
    <div className="ag-theme-alpine" style={{ height: '100vh' }}>
      <GridExample />
    </div>
  )
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100vw', height: '100vh' }), [])
  const gridStyle = useMemo(() => ({ height: '100vh', width: '100vw' }), [])
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          width: 180,
          filter: 'agTextColumnFilter'
        },
        {
          field: 'age',
          width: 90,
          filter: 'agNumberColumnFilter'
        },
        { headerName: 'Country', field: 'country', width: 140 }
      ]
    },
    {
      headerName: 'Sports Results',
      children: [
        { field: 'sport', width: 140 },
        {
          columnGroupShow: 'closed',
          field: 'total',
          width: 100,
          filter: 'agNumberColumnFilter'
        },
        {
          columnGroupShow: 'open',
          field: 'gold',
          width: 100,
          filter: 'agNumberColumnFilter'
        },
        {
          columnGroupShow: 'open',
          field: 'silver',
          width: 100,
          filter: 'agNumberColumnFilter'
        },
        {
          columnGroupShow: 'open',
          field: 'bronze',
          width: 100,
          filter: 'agNumberColumnFilter'
        }
      ]
    }
  ])
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: true
    }
  }, [])

  const onGridReady = useCallback(params => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => setRowData(data))
  }, [])

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  )
}
