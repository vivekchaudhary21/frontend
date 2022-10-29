import React, { useState, useMemo, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'

export default () => {
  return (
    <div style={{ height: '100vh', backgroundColor: 'darkgray' }}>
      <div className="ag-theme-alpine" style={{ height: 800 }}>
        <GridExample1 />
        <GridExample2 />
        <GridExample3 />
        <GridExample4 />
      </div>
    </div>
  )
}

const GridExample1 = () => {
  const columnDefs = [{ field: 'athlete' }, { field: 'sport' }, { field: 'age' }]
  return <AgGridReact columnDefs={columnDefs}></AgGridReact>
}

const GridExample2 = () => {
  const rowData = [
    {
      athlete: 'Michael Phelps',
      medals: {
        gold: 8,
        silver: 1,
        bronze: 0
      }
    },
    {
      athlete: 'Michael Phelps 1',
      medals: {
        gold: 83,
        silver: 14,
        bronze: 0
      }
    }
  ]
  const columnDefs = [
    { field: 'athlete' },
    // Using dot notation to access nested property
    { field: 'medals.gold', headerName: 'Gold' },
    { field: 'medals.silver', headerName: 'Silver' }
  ]

  return <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
}

const GridExample3 = () => {
  const columnDefs = [
    // uses the default column properties
    { headerName: 'Col A', field: 'a' },
    // overrides the default with a number filter
    { headerName: 'Col B', field: 'b', filter: 'agNumberColumnFilter' },
    // overrides the default using a column type
    { headerName: 'Col C', field: 'c', type: 'nonEditableColumn' },
    // overrides the default using a multiple column types
    { headerName: 'Col D', field: 'd', type: ['dateColumn', 'nonEditableColumn'] }
  ]

  // a default column definition with properties that get applied to every column
  const defaultColDef = {
    // set every column width
    width: 100,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter'
  }

  // if we had column groups, we could provide default group items here
  const defaultColGroupDef = {}

  // define a column type (you can define as many as you like)
  const columnTypes = {
    nonEditableColumn: { editable: false },
    dateColumn: {
      filter: 'agDateColumnFilter',
      // filterParams: { comparator: myDateComparator },
      suppressMenu: true
    }
  }

  return (
    <AgGridReact
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      defaultColGroupDef={defaultColGroupDef}
      columnTypes={columnTypes}
    ></AgGridReact>
  )
}

const GridExample4 = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState()
  const [columnDefs, setColumnDefs] = useState([
    // using default ColDef
    { field: 'athlete' },
    { field: 'sport' },
    // using number column type
    { field: 'age', type: 'numberColumn' },
    { field: 'year', type: 'numberColumn' },
    // using date and non-editable column types
    { field: 'date', type: ['dateColumn', 'nonEditableColumn'], width: 220 },
    {
      headerName: 'Medals',
      groupId: 'medalsGroup',
      children: [
        // using medal column type
        { headerName: 'Gold', field: 'gold', type: 'medalColumn' },
        { headerName: 'Silver', field: 'silver', type: 'medalColumn' },
        { headerName: 'Bronze', field: 'bronze', type: 'medalColumn' },
        {
          headerName: 'Total',
          field: 'total',
          type: 'medalColumn',
          columnGroupShow: 'closed'
        }
      ]
    }
  ])
  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      width: 150,
      // make every column editable
      editable: true,
      // make every column use 'text' filter by default
      filter: 'agTextColumnFilter',
      // enable floating filters by default
      floatingFilter: true,
      // make columns resizable
      resizable: true
    }
  }, [])
  const defaultColGroupDef = useMemo(() => {
    return {
      marryChildren: true
    }
  }, [])
  const columnTypes = useMemo(() => {
    return {
      numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
      medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
      nonEditableColumn: { editable: false },
      dateColumn: {
        // specify we want to use the date filter
        filter: 'agDateColumnFilter',
        // add extra parameters for the date filter
        filterParams: {
          // provide comparator function
          comparator: (filterLocalDateAtMidnight, cellValue) => {
            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = cellValue.split('/')
            const day = Number(dateParts[0])
            const month = Number(dateParts[1]) - 1
            const year = Number(dateParts[2])
            const cellDate = new Date(year, month, day)
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1
            } else {
              return 0
            }
          }
        }
      }
    }
  }, [])

  const onGridReady = useCallback(params => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => setRowData(data))
  }, [])

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            defaultColGroupDef={defaultColGroupDef}
            columnTypes={columnTypes}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  )
}
