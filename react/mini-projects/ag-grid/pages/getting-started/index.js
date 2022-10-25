import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component

export default () => {
  const gridRef = useRef() // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState() // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'make' }, // rowGroup is an enterprise feature and make a group of rows
    { field: 'model' },
    { field: 'price' }
  ])

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }))

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event)
  }, [])

  // Example load data from sever
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetch('https://www.ag-grid.com/example-assets/row-data.json')
        const rowData = await result.json()
        setRowData(rowData)
      } catch (error) {
        console.log('Error fetching data', error.message)
      }
    }
    getData()
  }, [])

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll()
  }, [])

  return (
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: 800, height: 500 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  )
}
